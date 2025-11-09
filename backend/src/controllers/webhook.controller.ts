import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { asyncHandler } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { sendOrderConfirmation } from '../utils/email';

const prisma = new PrismaClient();

export const handleRazorpayWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

  // Verify webhook signature
  const body = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    logger.error('Invalid webhook signature');
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  const event = req.body.event;
  const payload = req.body.payload;

  logger.info('Razorpay webhook received:', { event });

  try {
    switch (event) {
      case 'payment.authorized':
      case 'payment.captured':
        await handlePaymentSuccess(payload.payment.entity);
        break;

      case 'payment.failed':
        await handlePaymentFailed(payload.payment.entity);
        break;

      case 'order.paid':
        await handleOrderPaid(payload.order.entity);
        break;

      default:
        logger.info('Unhandled webhook event:', event);
    }

    res.json({ status: 'ok' });
  } catch (error) {
    logger.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

async function handlePaymentSuccess(paymentData: any) {
  const { id: paymentId, order_id: razorpayOrderId, amount: _amount, method } = paymentData;

  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId },
    include: {
      order: {
        include: {
          user: true,
          items: true,
        },
      },
    },
  });

  if (!payment) {
    logger.error('Payment not found for order:', razorpayOrderId);
    return;
  }

  // Update payment status
  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      razorpayPaymentId: paymentId,
      status: 'SUCCESS',
      method,
    },
  });

  // Update order status
  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: 'PAID' },
  });

  // Reduce stock
  for (const item of payment.order.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  // Send confirmation email
  await sendOrderConfirmation(payment.order);

  logger.info('Payment processed successfully:', paymentId);
}

async function handlePaymentFailed(paymentData: any) {
  const { order_id: razorpayOrderId, error_description } = paymentData;

  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId },
  });

  if (!payment) {
    logger.error('Payment not found for order:', razorpayOrderId);
    return;
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: 'FAILED',
      failureReason: error_description,
    },
  });

  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: 'CANCELLED' },
  });

  logger.info('Payment failed:', razorpayOrderId);
}

async function handleOrderPaid(orderData: any) {
  const { id: razorpayOrderId } = orderData;

  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId },
  });

  if (!payment) {
    logger.error('Payment not found for order:', razorpayOrderId);
    return;
  }

  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: 'PROCESSING' },
  });

  logger.info('Order marked as processing:', razorpayOrderId);
}
