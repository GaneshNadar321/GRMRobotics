import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export const downloadPublicManual = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const manual = await prisma.manual.findUnique({
    where: { id },
    include: {
      product: {
        select: { name: true, isActive: true }
      }
    }
  });

  if (!manual) {
    throw new AppError('Manual not found', 404);
  }

  // Check if the product is active (optional security check)
  if (!manual.product?.isActive) {
    throw new AppError('Manual not available', 403);
  }

  // Construct file path
  const filePath = path.join(__dirname, '../../uploads', path.basename(manual.fileUrl));
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new AppError('File not found', 404);
  }

  // Set headers for download
  const filename = `${manual.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  
  // Send file
  res.sendFile(filePath);
});