import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

// Get all public tutorials
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const tutorials = await prisma.tutorial.findMany({
    where: {
      isFree: true, // Only show free tutorials to public
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  return res.json(tutorials);
}));

// Get tutorial by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const tutorial = await prisma.tutorial.findUnique({
    where: { id },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!tutorial) {
    return res.status(404).json({ error: 'Tutorial not found' });
  }

  // Only allow access to free tutorials for public users
  if (!tutorial.isFree) {
    return res.status(403).json({ error: 'This tutorial requires authentication' });
  }

  return res.json(tutorial);
}));

export default router;