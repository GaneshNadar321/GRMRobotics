import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
  }

  const cartWithTotals = {
    ...cart,
    items: cart.items.map(item => ({
      ...item,
      subtotal: Number(item.product.price) * item.quantity,
    })),
    total: cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    ),
  };

  res.json(cartWithTotals);
});

export const addToCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { productId, quantity } = req.body;

  // Validate input
  if (!productId || !quantity || quantity < 1) {
    throw new AppError('Invalid product or quantity', 400);
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (!product.isActive) {
    throw new AppError('Product is not available', 400);
  }

  if (product.stock < quantity) {
    throw new AppError('Insufficient stock', 400);
  }

  // Find or create cart
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  let cartItem;
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (product.stock < newQuantity) {
      throw new AppError('Insufficient stock', 400);
    }
    cartItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: newQuantity },
      include: { product: true },
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
      include: { product: true },
    });
  }

  res.status(201).json(cartItem);
});

export const updateCartItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const { quantity } = req.body;

  const cartItem = await prisma.cartItem.findUnique({
    where: { id },
    include: { cart: true, product: true },
  });

  if (!cartItem || cartItem.cart.userId !== userId) {
    throw new AppError('Cart item not found', 404);
  }

  if (cartItem.product.stock < quantity) {
    throw new AppError('Insufficient stock', 400);
  }

  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: { product: true },
  });

  res.json(updated);
});

export const removeFromCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  const cartItem = await prisma.cartItem.findUnique({
    where: { id },
    include: { cart: true },
  });

  if (!cartItem || cartItem.cart.userId !== userId) {
    throw new AppError('Cart item not found', 404);
  }

  await prisma.cartItem.delete({ where: { id } });

  res.json({ message: 'Item removed from cart' });
});

export const clearCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  res.json({ message: 'Cart cleared' });
});
