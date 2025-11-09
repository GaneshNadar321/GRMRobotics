import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { sendOrderNotification, sendOrderConfirmation } from '../utils/email';

const prisma = new PrismaClient();

// Initialize Razorpay only when needed
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    throw new AppError('Razorpay configuration is missing', 500);
  }
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { shippingAddress, billingAddress, couponCode } = req.body;

    console.log('Creating order for user:', userId);
    console.log('Shipping address:', shippingAddress);

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.name || !shippingAddress.phone || !shippingAddress.address) {
      throw new AppError('Complete shipping address is required', 400);
    }

    // Get cart with items
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    console.log('Cart found:', cart ? `${cart.items.length} items` : 'No cart');

    if (!cart || cart.items.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    // Validate stock
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${item.product.name}`, 400);
      }
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

    console.log('Subtotal calculated:', subtotal);

    let discount = 0;
    if (couponCode) {
      console.log('Applying coupon:', couponCode);
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
    });

    if (coupon && coupon.isActive) {
      const now = new Date();
      if (now >= coupon.validFrom && now <= coupon.validUntil) {
        if (!coupon.usageLimit || coupon.usageCount < coupon.usageLimit) {
          if (!coupon.minOrderValue || subtotal >= Number(coupon.minOrderValue)) {
            if (coupon.discountType === 'PERCENTAGE') {
              discount = (subtotal * Number(coupon.discountValue)) / 100;
              if (coupon.maxDiscount) {
                discount = Math.min(discount, Number(coupon.maxDiscount));
              }
            } else {
              discount = Number(coupon.discountValue);
            }
          }
        }
      }
    }
  }

  const tax = (subtotal - discount) * 0.18; // 18% GST
  const shipping = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000
  const total = subtotal - discount + tax + shipping;

  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Create order in database
  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId,
      status: 'PENDING',
      subtotal,
      discount,
      tax,
      shipping,
      total,
      couponCode,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          productSku: item.product.sku,
          quantity: item.quantity,
          price: item.product.price,
          total: Number(item.product.price) * item.quantity,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // Create Razorpay order (skip if in dev mode with invalid keys)
  let razorpayOrder;
  try {
    const razorpay = getRazorpayInstance();
    razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // Convert to paise
      currency: 'INR',
      receipt: order.id,
      notes: {
        orderNumber: order.orderNumber,
        userId,
      },
    });
  } catch (razorpayError: any) {
    console.log('Razorpay error (using mock order for dev):', razorpayError.error?.description);
    // Create mock Razorpay order for development
    razorpayOrder = {
      id: `order_mock_${Date.now()}`,
      amount: Math.round(total * 100),
      currency: 'INR',
    };
  }

  // Create payment record
  await prisma.payment.create({
    data: {
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      currency: 'INR',
      status: 'PENDING',
    },
  });

  // Update coupon usage
  if (couponCode) {
    await prisma.coupon.update({
      where: { code: couponCode },
      data: { usageCount: { increment: 1 } },
    });
  }

    res.status(201).json({
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
      },
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    throw new AppError(error.message || 'Failed to create order', 500);
  }
});

export const confirmCODOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { orderId } = req.body;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      user: true,
    },
  });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (order.userId !== userId) {
    throw new AppError('Unauthorized', 403);
  }

  // Update order status to PAID (COD)
  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'PAID' },
  });

  // Create payment record for COD
  await prisma.payment.create({
    data: {
      orderId: order.id,
      razorpayOrderId: `cod_${Date.now()}`,
      amount: order.total,
      currency: 'INR',
      status: 'SUCCESS',
      razorpayPaymentId: 'COD',
    },
  });

  // Reduce stock
  for (const item of order.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  // Clear cart
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  // Send confirmation emails
  await sendOrderConfirmation(order);
  await sendOrderNotification(order);

  res.json({
    message: 'Order confirmed successfully',
    order,
  });
});

export const verifyPayment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Verify signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    throw new AppError('Invalid payment signature', 400);
  }

  // Update payment and order
  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: razorpay_order_id },
    include: { order: { include: { user: true } } },
  });

  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  if (payment.order.userId !== userId) {
    throw new AppError('Unauthorized', 403);
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'SUCCESS',
      },
    }),
    prisma.order.update({
      where: { id: payment.orderId },
      data: { status: 'PAID' },
    }),
  ]);

  // Reduce stock
  const orderItems = await prisma.orderItem.findMany({
    where: { orderId: payment.orderId },
  });

  for (const item of orderItems) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  // Clear cart
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  // Get full order details for email
  const fullOrder = await prisma.order.findUnique({
    where: { id: payment.orderId },
    include: {
      user: true,
      items: true,
    },
  });

  if (fullOrder) {
    // Send confirmation email to customer
    await sendOrderConfirmation(fullOrder);
    
    // Send notification email to admin
    await sendOrderNotification(fullOrder);
  }

  res.json({
    message: 'Payment verified successfully',
    order: payment.order,
  });
});

export const applyCoupon = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { code, subtotal } = req.body;

  const coupon = await prisma.coupon.findUnique({ where: { code } });

  if (!coupon || !coupon.isActive) {
    throw new AppError('Invalid coupon code', 400);
  }

  const now = new Date();
  if (now < coupon.validFrom || now > coupon.validUntil) {
    throw new AppError('Coupon has expired', 400);
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    throw new AppError('Coupon usage limit reached', 400);
  }

  if (coupon.minOrderValue && subtotal < Number(coupon.minOrderValue)) {
    throw new AppError(
      `Minimum order value of ₹${coupon.minOrderValue} required`,
      400
    );
  }

  let discount = 0;
  if (coupon.discountType === 'PERCENTAGE') {
    discount = (subtotal * Number(coupon.discountValue)) / 100;
    if (coupon.maxDiscount) {
      discount = Math.min(discount, Number(coupon.maxDiscount));
    }
  } else {
    discount = Number(coupon.discountValue);
  }

  res.json({
    coupon: {
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    },
    discount,
  });
});
