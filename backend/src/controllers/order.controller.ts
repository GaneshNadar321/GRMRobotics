import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getUserOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { page = '1', limit = '10' } = req.query;

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
                manuals: true,
              },
            },
          },
        },
        payment: true,
      },
    }),
    prisma.order.count({ where: { userId } }),
  ]);

  res.json({
    orders,
    pagination: {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      total,
      pages: Math.ceil(total / parseInt(limit as string)),
    },
  });
});

export const getOrderById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
              manuals: true,
            },
          },
        },
      },
      payment: true,
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
        },
      },
    },
  });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Users can only view their own orders, admins can view all
  if (order.userId !== userId && req.user!.role !== 'ADMIN') {
    throw new AppError('Unauthorized', 403);
  }

  res.json(order);
});

export const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, trackingNumber } = req.body;

  const updateData: any = { status };

  if (status === 'SHIPPED' && trackingNumber) {
    updateData.trackingNumber = trackingNumber;
    updateData.shippedAt = new Date();
  }

  if (status === 'DELIVERED') {
    updateData.deliveredAt = new Date();
  }

  if (status === 'CANCELLED') {
    updateData.cancelledAt = new Date();
  }

  const order = await prisma.order.update({
    where: { id },
    data: updateData,
    include: {
      items: true,
      payment: true,
    },
  });

  res.json(order);
});
