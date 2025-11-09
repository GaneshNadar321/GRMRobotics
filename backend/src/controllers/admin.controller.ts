import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

// Dashboard Stats
export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [
    totalRevenue,
    totalOrders,
    totalUsers,
    totalProducts,
    pendingOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } },
      _sum: { total: true },
    }),
    prisma.order.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.product.count(),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.product.count({ where: { stock: { lte: 5 } } }),
  ]);

  res.json({
    totalRevenue: totalRevenue._sum.total || 0,
    totalOrders,
    totalUsers,
    totalProducts,
    pendingOrders,
    lowStockProducts,
  });
});

// Users/Customers
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { search } = req.query;

  const where: any = { role: 'USER' };
  if (search) {
    where.OR = [
      { firstName: { contains: search as string, mode: 'insensitive' } },
      { lastName: { contains: search as string, mode: 'insensitive' } },
      { email: { contains: search as string, mode: 'insensitive' } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    include: {
      _count: { select: { orders: true } },
      orders: {
        select: { total: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const usersWithStats = users.map(user => ({
    ...user,
    totalSpent: user.orders.reduce((sum, order) => sum + Number(order.total), 0),
    orders: undefined,
  }));

  res.json({
    users: usersWithStats,
    total: users.length,
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  res.json(user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({ where: { id } });

  res.json({ message: 'User deleted successfully' });
});

// Products
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { search, category, limit } = req.query;

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search as string, mode: 'insensitive' } },
      { description: { contains: search as string, mode: 'insensitive' } },
      { sku: { contains: search as string, mode: 'insensitive' } },
    ];
  }
  if (category) {
    where.categoryId = category as string;
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: { select: { name: true } },
      images: { select: { url: true, isPrimary: true } },
      _count: { select: { orderItems: true, reviews: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit as string) : undefined,
  });

  res.json({ products });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
      tutorials: true,
      manuals: true,
      reviews: { include: { user: { select: { firstName: true, lastName: true } } } },
    },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.json(product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const productData = req.body;

  // Create product
  const product = await prisma.product.create({
    data: {
      ...productData,
      price: parseFloat(productData.price),
      compareAtPrice: productData.compareAtPrice ? parseFloat(productData.compareAtPrice) : null,
      stock: parseInt(productData.stock),
      lowStockThreshold: parseInt(productData.lowStockThreshold || '5'),
      weight: productData.weight ? parseFloat(productData.weight) : null,
      tags: productData.tags ? productData.tags.split(',').map((tag: string) => tag.trim()) : [],
    },
  });

  // Add images if uploaded
  if (files && files.length > 0) {
    const imageData = files.map((file, index) => ({
      productId: product.id,
      url: `/uploads/${file.filename}`,
      altText: `${product.name} - Image ${index + 1}`,
      isPrimary: index === 0,
      sortOrder: index,
    }));

    await prisma.productImage.createMany({ data: imageData });
  }

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...updateData,
      price: updateData.price ? parseFloat(updateData.price) : undefined,
      compareAtPrice: updateData.compareAtPrice ? parseFloat(updateData.compareAtPrice) : undefined,
      stock: updateData.stock ? parseInt(updateData.stock) : undefined,
      lowStockThreshold: updateData.lowStockThreshold ? parseInt(updateData.lowStockThreshold) : undefined,
      weight: updateData.weight ? parseFloat(updateData.weight) : undefined,
      tags: updateData.tags ? updateData.tags.split(',').map((tag: string) => tag.trim()) : undefined,
    },
  });

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        orderItems: true,
        cartItems: true,
        reviews: true,
        wishlistItems: true,
      },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Check if product has been ordered
    if (product.orderItems.length > 0) {
      // Instead of deleting, mark as inactive
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { 
          isActive: false,
          name: `${product.name} (Deleted)`,
          updatedAt: new Date(),
        },
      });
      
      return res.json({ 
        message: 'Product has been ordered and cannot be deleted. Marked as inactive instead.',
        product: updatedProduct,
        action: 'deactivated'
      });
    }

    // If no orders, we can safely delete
    // First delete related records that don't have cascade
    await prisma.$transaction(async (tx) => {
      // Delete cart items
      await tx.cartItem.deleteMany({ where: { productId: id } });
      
      // Delete reviews
      await tx.review.deleteMany({ where: { productId: id } });
      
      // Delete wishlist items
      await tx.wishlist.deleteMany({ where: { productId: id } });
      
      // Delete stock notifications
      await tx.stockNotification.deleteMany({ where: { productId: id } });
      
      // Delete product questions
      await tx.productQuestion.deleteMany({ where: { productId: id } });
      
      // Now delete the product (images, tutorials, manuals will cascade)
      await tx.product.delete({ where: { id } });
    });

    return res.json({ 
      message: 'Product deleted successfully',
      action: 'deleted'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error instanceof AppError) {
      throw error;
    }
    
    // Handle Prisma foreign key constraint errors
    if ((error as any).code === 'P2003') {
      throw new AppError('Cannot delete product: it is referenced by other records', 400);
    }
    
    throw new AppError('Failed to delete product', 500);
  }
});

// Orders
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const { limit } = req.query;

  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: { firstName: true, lastName: true, email: true },
      },
      items: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit as string) : undefined,
  });

  res.json({ orders });
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: { product: true },
      },
      payment: true,
    },
  });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  res.json(order);
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, trackingNumber } = req.body;

  const order = await prisma.order.update({
    where: { id },
    data: {
      status,
      trackingNumber,
      shippedAt: status === 'SHIPPED' ? new Date() : undefined,
      deliveredAt: status === 'DELIVERED' ? new Date() : undefined,
    },
  });

  res.json(order);
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.order.delete({ where: { id } });

  res.json({ message: 'Order deleted successfully' });
});

// Tutorials
export const getTutorials = asyncHandler(async (_req: Request, res: Response) => {
  const tutorials = await prisma.tutorial.findMany({
    include: { product: { select: { name: true } } },
    orderBy: { sortOrder: 'asc' },
  });

  res.json(tutorials);
});

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const createTutorial = asyncHandler(async (req: Request, res: Response) => {
  const tutorialData = req.body;

  // Auto-extract thumbnail from YouTube URL if not provided
  if (tutorialData.videoUrl && !tutorialData.thumbnail) {
    const videoId = getYouTubeVideoId(tutorialData.videoUrl);
    if (videoId) {
      tutorialData.thumbnail = getYouTubeThumbnail(videoId);
    }
  }

  const tutorial = await prisma.tutorial.create({
    data: tutorialData,
  });

  res.status(201).json(tutorial);
});

export const updateTutorial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  // Auto-extract thumbnail from YouTube URL if video URL is being updated
  if (updateData.videoUrl) {
    const videoId = getYouTubeVideoId(updateData.videoUrl);
    if (videoId && !updateData.thumbnail) {
      updateData.thumbnail = getYouTubeThumbnail(videoId);
    }
  }

  const tutorial = await prisma.tutorial.update({
    where: { id },
    data: updateData,
  });

  res.json(tutorial);
});

export const deleteTutorial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.tutorial.delete({ where: { id } });

  res.json({ message: 'Tutorial deleted successfully' });
});

// Manuals
export const getManuals = asyncHandler(async (_req: Request, res: Response) => {
  const manuals = await prisma.manual.findMany({
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });

  res.json(manuals);
});

export const createManual = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const { title, description, productId, version } = req.body;

  if (!file) {
    throw new AppError('No file uploaded', 400);
  }

  const manual = await prisma.manual.create({
    data: {
      title,
      description,
      productId,
      fileUrl: `/uploads/${file.filename}`,
      fileSize: file.size,
      version: version || '1.0',
    },
  });

  res.status(201).json(manual);
});

export const updateManual = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const manual = await prisma.manual.update({
    where: { id },
    data: updateData,
  });

  res.json(manual);
});

export const downloadManual = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const manual = await prisma.manual.findUnique({
    where: { id },
  });

  if (!manual) {
    throw new AppError('Manual not found', 404);
  }

  // Construct file path
  const filePath = path.join(__dirname, '../../uploads', path.basename(manual.fileUrl));
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new AppError('File not found', 404);
  }

  // Set headers for download
  res.setHeader('Content-Disposition', `attachment; filename="${manual.title}.pdf"`);
  res.setHeader('Content-Type', 'application/pdf');
  
  // Send file
  res.sendFile(filePath);
});

export const deleteManual = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.manual.delete({ where: { id } });

  res.json({ message: 'Manual deleted successfully' });
});

// Reviews
export const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const { filter } = req.query;

  const where: any = {};
  if (filter === 'pending') where.isApproved = false;
  if (filter === 'approved') where.isApproved = true;

  const reviews = await prisma.review.findMany({
    where,
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      product: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(reviews);
});

export const approveReview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const review = await prisma.review.update({
    where: { id },
    data: { isApproved: true },
  });

  res.json(review);
});

export const rejectReview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const review = await prisma.review.update({
    where: { id },
    data: { isApproved: false },
  });

  res.json(review);
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.review.delete({ where: { id } });

  res.json({ message: 'Review deleted successfully' });
});

// Coupons
export const getCoupons = asyncHandler(async (_req: Request, res: Response) => {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json(coupons);
});

export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const couponData = req.body;

  const coupon = await prisma.coupon.create({
    data: couponData,
  });

  res.status(201).json(coupon);
});

export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const coupon = await prisma.coupon.update({
    where: { id },
    data: updateData,
  });

  res.json(coupon);
});

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.coupon.delete({ where: { id } });

  res.json({ message: 'Coupon deleted successfully' });
});

// Media
export const getMedia = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.query;

  // Get all product images and manuals
  const [images, manuals] = await Promise.all([
    prisma.productImage.findMany({
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.manual.findMany({
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  let media: any[] = [];

  if (!type || type === 'all' || type === 'images') {
    media = [...media, ...images.map(img => ({
      id: img.id,
      name: img.altText || 'Image',
      url: img.url,
      type: 'image',
      createdAt: img.createdAt,
    }))];
  }

  if (!type || type === 'all' || type === 'pdfs') {
    media = [...media, ...manuals.map(manual => ({
      id: manual.id,
      name: manual.title,
      url: manual.fileUrl,
      type: 'pdf',
      createdAt: manual.createdAt,
    }))];
  }

  res.json(media);
});

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw new AppError('No files uploaded', 400);
  }

  const media = files.map(file => ({
    name: file.originalname,
    url: `/uploads/${file.filename}`,
    type: file.mimetype.startsWith('image/') ? 'image' : 'pdf',
    size: file.size,
  }));

  res.status(201).json(media);
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Try to delete from both tables
  try {
    await prisma.productImage.delete({ where: { id } });
  } catch {
    await prisma.manual.delete({ where: { id } });
  }

  res.json({ message: 'Media deleted successfully' });
});

// Messages
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { search, status } = req.query;

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search as string, mode: 'insensitive' } },
      { email: { contains: search as string, mode: 'insensitive' } },
      { subject: { contains: search as string, mode: 'insensitive' } },
      { message: { contains: search as string, mode: 'insensitive' } },
    ];
  }
  if (status === 'read') {
    where.isRead = true;
  } else if (status === 'unread') {
    where.isRead = false;
  }

  const messages = await prisma.contactMessage.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  res.json(messages);
});

export const markMessageAsRead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const message = await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });

  res.json(message);
});

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.contactMessage.delete({ where: { id } });

  res.json({ message: 'Message deleted successfully' });
});

// Analytics
export const getSalesAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } },
    select: { total: true, createdAt: true },
  });

  res.json({ orders });
});

export const getProductAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: {
      _count: { select: { orderItems: true } },
    },
    orderBy: { orderItems: { _count: 'desc' } },
    take: 10,
  });

  res.json({ products });
});

export const getCustomerAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const customers = await prisma.user.findMany({
    where: { role: 'USER' },
    include: {
      _count: { select: { orders: true } },
    },
  });

  res.json({ customers });
});
