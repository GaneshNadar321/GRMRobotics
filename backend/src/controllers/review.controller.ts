import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getProductReviews = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productId } = req.params;
  const { page = '1', limit = '10' } = req.query;

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const where: any = { productId, isApproved: true };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    }),
    prisma.review.count({ where }),
  ]);

  res.json({
    reviews,
    pagination: {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      total,
      pages: Math.ceil(total / parseInt(limit as string)),
    },
  });
});

export const getUserReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { productId } = req.params;

  const review = await prisma.review.findUnique({
    where: {
      productId_userId: {
        productId,
        userId,
      },
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.json(review);
});

export const createReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { productId, rating, title, comment } = req.body;

  // Check if product exists
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if user has purchased this product
  const hasPurchased = await prisma.orderItem.findFirst({
    where: {
      productId,
      order: {
        userId,
        status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] },
      },
    },
  });

  // Check if user already reviewed this product
  const existingReview = await prisma.review.findUnique({
    where: {
      productId_userId: {
        productId,
        userId,
      },
    },
  });

  if (existingReview) {
    throw new AppError('You have already reviewed this product', 400);
  }

  const review = await prisma.review.create({
    data: {
      productId,
      userId,
      rating,
      title,
      comment,
      isVerified: !!hasPurchased,
      isApproved: true, // Auto-approve reviews
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.status(201).json(review);
});

export const updateReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const { rating, title, comment } = req.body;

  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  if (review.userId !== userId) {
    throw new AppError('Unauthorized', 403);
  }

  const updated = await prisma.review.update({
    where: { id },
    data: {
      rating,
      title,
      comment,
      isApproved: true, // Keep approved status
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.json(updated);
});

export const deleteReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  if (review.userId !== userId && req.user!.role !== 'ADMIN') {
    throw new AppError('Unauthorized', 403);
  }

  await prisma.review.delete({ where: { id } });

  res.json({ message: 'Review deleted successfully' });
});

export const approveReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  const review = await prisma.review.update({
    where: { id },
    data: { isApproved },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.json(review);
});
