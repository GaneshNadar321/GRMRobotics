import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
  const {
    q = '',
    category,
    difficulty,
    minPrice,
    maxPrice,
    ageGroup,
    page = '1',
    limit = '12',
  } = req.query;

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const where: any = { isActive: true };

  // Full-text search
  if (q) {
    where.OR = [
      { name: { contains: q as string, mode: 'insensitive' } },
      { description: { contains: q as string, mode: 'insensitive' } },
      { shortDescription: { contains: q as string, mode: 'insensitive' } },
      { tags: { has: q as string } },
      { sku: { contains: q as string, mode: 'insensitive' } },
    ];
  }

  // Filters
  if (category) {
    where.category = { slug: category };
  }

  if (difficulty) {
    where.difficulty = difficulty;
  }

  if (ageGroup) {
    where.ageGroup = ageGroup;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice as string);
    if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  const productsWithRatings = products.map(product => {
    const ratings = product.reviews.map(r => r.rating);
    const avgRating = ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;

    return {
      ...product,
      averageRating: avgRating,
      reviewCount: ratings.length,
      reviews: undefined,
    };
  });

  res.json({
    products: productsWithRatings,
    pagination: {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      total,
      pages: Math.ceil(total / parseInt(limit as string)),
    },
    filters: {
      q,
      category,
      difficulty,
      minPrice,
      maxPrice,
      ageGroup,
    },
  });
});
