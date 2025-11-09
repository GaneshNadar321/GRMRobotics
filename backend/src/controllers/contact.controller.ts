import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';
import { sendContactNotification } from '../utils/email';

const prisma = new PrismaClient();

export const submitContactForm = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'Name, email, subject, and message are required' });
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  // Save to database
  const contactMessage = await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone || null,
      subject,
      message,
    },
  });

  // Send email notification to admin
  try {
    await sendContactNotification({
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
      id: contactMessage.id,
    });
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    // Don't fail the request if email fails
  }

  res.status(201).json({
    message: 'Thank you for contacting us! We will get back to you soon.',
    id: contactMessage.id,
  });
});
