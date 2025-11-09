import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const subscribe = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  // Check if already subscribed
  const existing = await prisma.newsletter.findUnique({
    where: { email },
  });

  if (existing) {
    if (existing.isActive) {
      res.status(400).json({ error: 'Email already subscribed' });
      return;
    } else {
      // Reactivate subscription
      await prisma.newsletter.update({
        where: { email },
        data: {
          isActive: true,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      });
      res.json({ message: 'Successfully resubscribed to newsletter!' });
      return;
    }
  }

  // Create new subscription
  await prisma.newsletter.create({
    data: { email },
  });

  res.status(201).json({ message: 'Successfully subscribed to newsletter!' });
});

export const unsubscribe = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const subscription = await prisma.newsletter.findUnique({
    where: { email },
  });

  if (!subscription) {res.status(404).json({ error: 'Email not found in newsletter' });
    return;
  }

  await prisma.newsletter.update({
    where: { email },
    data: {
      isActive: false,
      unsubscribedAt: new Date(),
    },
  });

  res.json({ message: 'Successfully unsubscribed from newsletter' });
});
