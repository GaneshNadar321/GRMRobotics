import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Get user's wishlist
export const getWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  const userId = req.user.userId;

  const wishlistItems = await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          images: {
            take: 1,
            orderBy: { sortOrder: 'asc' },
          },
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    items: wishlistItems.map(item => ({
      id: item.id,
      product: item.product,
      addedAt: item.createdAt,
    })),
    count: wishlistItems.length,
  });
});

// Add product to wishlist
export const addToWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  const userId = req.user.userId;
  const { productId } = req.body;

  if (!productId) {
    res.status(400).json({ error: 'Product ID is required' });
    return;
  }

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  // Check if already in wishlist
  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existing) {
    res.status(400).json({ error: 'Product already in wishlist' });
    return;
  }

  // Add to wishlist
  const wishlistItem = await prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
    include: {
      product: {
        include: {
          images: {
            take: 1,
            orderBy: { sortOrder: 'asc' },
          },
        },
      },
    },
  });

  res.status(201).json({
    message: 'Product added to wishlist',
    item: wishlistItem,
  });
});

// Remove product from wishlist
export const removeFromWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  const userId = req.user.userId;
  const { productId } = req.params;

  const wishlistItem = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!wishlistItem) {
    res.status(404).json({ error: 'Product not in wishlist' });
    return;
  }

  await prisma.wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  res.json({ message: 'Product removed from wishlist' });
});

// Clear entire wishlist
export const clearWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  const userId = req.user.userId;

  await prisma.wishlist.deleteMany({
    where: { userId },
  });

  res.json({ message: 'Wishlist cleared' });
});
