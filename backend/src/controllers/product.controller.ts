import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '12',
      category,
      difficulty,
      minPrice,
      maxPrice,
      search,
      sortBy = 'newest',
      inStock,
      isFeatured,
    } = req.query;

    // Validate and parse numeric values with proper error handling
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 12));
    const skip = (pageNum - 1) * limitNum;

    const where: any = { isActive: true };

    if (category) {
      where.category = { slug: category };
    }

    if (difficulty && ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].includes(difficulty as string)) {
      where.difficulty = difficulty;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        const minPriceNum = parseFloat(minPrice as string);
        if (!isNaN(minPriceNum)) where.price.gte = minPriceNum;
      }
      if (maxPrice) {
        const maxPriceNum = parseFloat(maxPrice as string);
        if (!isNaN(maxPriceNum)) where.price.lte = maxPriceNum;
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } },
      ];
    }

    if (inStock === 'true') {
      where.stock = { gt: 0 };
    }

    if (isFeatured === 'true') {
      where.isFeatured = true;
    }

  // Handle sorting options
  let orderByClause: any = { createdAt: 'desc' }; // default

  switch (sortBy) {
    case 'newest':
      orderByClause = { createdAt: 'desc' };
      break;
    case 'oldest':
      orderByClause = { createdAt: 'asc' };
      break;
    case 'price-low':
      orderByClause = { price: 'asc' };
      break;
    case 'price-high':
      orderByClause = { price: 'desc' };
      break;
    case 'rating':
      // For rating, we'll sort by a calculated field later
      orderByClause = { createdAt: 'desc' };
      break;
    case 'popular':
      // For popular, we can sort by review count or featured status
      orderByClause = { isFeatured: 'desc' };
      break;
    default:
      orderByClause = { createdAt: 'desc' };
  }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: orderByClause,
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

  let productsWithRatings = products.map(product => {
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

  // Handle rating-based sorting after calculating ratings
  if (sortBy === 'rating') {
    productsWithRatings = productsWithRatings.sort((a, b) => b.averageRating - a.averageRating);
  }

    res.json({
      products: productsWithRatings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      tutorials: { orderBy: { sortOrder: 'asc' } },
      manuals: true,
      reviews: {
        where: { isApproved: true },
        include: {
          user: {
            select: { firstName: true, lastName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  const ratings = product.reviews.map(r => r.rating);
  const avgRating = ratings.length > 0
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;

  res.json({
    ...product,
    averageRating: avgRating,
    reviewCount: ratings.length,
  });
});

// Helper function to generate unique slug
const generateUniqueSlug = async (name: string): Promise<string> => {
  if (!name || typeof name !== 'string') {
    throw new AppError('Product name is required for slug generation', 400);
  }

  let baseSlug = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();

  // Ensure slug is not empty
  if (!baseSlug) {
    baseSlug = 'product';
  }

  let slug = baseSlug;
  let counter = 1;

  // Check if slug exists and increment counter if needed
  while (true) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existingProduct) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const productData = req.body;

  // Generate unique slug
  const slug = await generateUniqueSlug(productData.name);

  const product = await prisma.product.create({
    data: {
      ...productData,
      slug,
    },
    include: {
      category: true,
      images: true,
    },
  });

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  // If name is being updated, regenerate slug
  if (updateData.name) {
    // Get current product to check if name actually changed
    const currentProduct = await prisma.product.findUnique({
      where: { id },
      select: { name: true, slug: true },
    });

    if (!currentProduct) {
      throw new AppError('Product not found', 404);
    }

    // Only regenerate slug if name actually changed
    if (currentProduct.name !== updateData.name) {
      updateData.slug = await generateUniqueSlug(updateData.name);
    }
  }

  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    include: {
      category: true,
      images: true,
    },
  });

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if product exists
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if product is in any orders
  const orderItems = await prisma.orderItem.findFirst({
    where: { productId: id },
  });

  if (orderItems) {
    throw new AppError('Cannot delete product that has been ordered. Please deactivate it instead.', 400);
  }

  // Delete the product (cascade will handle images, tutorials, manuals, reviews, cart items)
  await prisma.product.delete({ where: { id } });

  res.json({ message: 'Product deleted successfully' });
});

export const getProductTutorials = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tutorials = await prisma.tutorial.findMany({
    where: { productId: id },
    orderBy: { sortOrder: 'asc' },
  });

  res.json(tutorials);
});

export const getProductManuals = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const manuals = await prisma.manual.findMany({
    where: { productId: id },
  });

  res.json(manuals);
});

export const addTutorial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tutorialData = req.body;

  const tutorial = await prisma.tutorial.create({
    data: {
      ...tutorialData,
      productId: id,
    },
  });

  res.status(201).json(tutorial);
});

export const addManual = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file as Express.Multer.File;

  if (!file) {
    throw new AppError('No file uploaded', 400);
  }

  // Check if product exists
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  const { title, description, version } = req.body;

  const manual = await prisma.manual.create({
    data: {
      productId: id,
      title: title || file.originalname.replace('.pdf', ''),
      description: description || '',
      fileUrl: `/uploads/${file.filename}`,
      fileSize: file.size,
      version: version || '1.0',
    },
  });

  res.status(201).json(manual);
});

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  // Ensure categories exist before fetching
  const categoryCount = await prisma.category.count();
  
  if (categoryCount === 0) {
    console.log('📦 No categories found. Creating default categories...');
    
    await Promise.all([
      prisma.category.create({
        data: {
          name: 'Ground Robots',
          slug: 'ground-robots',
          description: 'Land-based robots including wheeled and tracked vehicles',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Aerial Robots',
          slug: 'aerial-robots',
          description: 'Flying robots and drones for aerial applications',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'UAV (Drones)',
          slug: 'uav-drones',
          description: 'Unmanned Aerial Vehicles and drone kits',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Beginner Kits',
          slug: 'beginner-kits',
          description: 'Perfect for students just starting their robotics journey',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Intermediate Kits',
          slug: 'intermediate-kits',
          description: 'For students ready to take on more complex challenges',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Advanced Kits',
          slug: 'advanced-kits',
          description: 'Professional-grade robotics kits for advanced learners',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Sensors & Components',
          slug: 'sensors-components',
          description: 'Individual sensors and electronic components',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Accessories',
          slug: 'accessories',
          description: 'Batteries, cables, and other accessories',
          isActive: true,
        },
      }),
    ]);
    
    console.log('✅ Categories created successfully!');
  }

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  });

  res.json(categories);
});

// Manual category creation endpoint
export const createCategories = asyncHandler(async (_req: Request, res: Response) => {
  try {
    // Delete existing categories first (optional)
    await prisma.category.deleteMany({});
    
    // Create all categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Ground Robots',
          slug: 'ground-robots',
          description: 'Land-based robots including wheeled and tracked vehicles',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Aerial Robots',
          slug: 'aerial-robots',
          description: 'Flying robots and drones for aerial applications',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'UAV (Drones)',
          slug: 'uav-drones',
          description: 'Unmanned Aerial Vehicles and drone kits',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Beginner Kits',
          slug: 'beginner-kits',
          description: 'Perfect for students just starting their robotics journey',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Intermediate Kits',
          slug: 'intermediate-kits',
          description: 'For students ready to take on more complex challenges',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Advanced Kits',
          slug: 'advanced-kits',
          description: 'Professional-grade robotics kits for advanced learners',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Sensors & Components',
          slug: 'sensors-components',
          description: 'Individual sensors and electronic components',
          isActive: true,
        },
      }),
      prisma.category.create({
        data: {
          name: 'Accessories',
          slug: 'accessories',
          description: 'Batteries, cables, and other accessories',
          isActive: true,
        },
      }),
    ]);
    
    res.json({
      message: 'Categories created successfully',
      categories: categories.map(cat => ({ id: cat.id, name: cat.name, slug: cat.slug }))
    });
  } catch (error) {
    console.error('Error creating categories:', error);
    res.status(500).json({ error: 'Failed to create categories' });
  }
});

export const uploadProductImages = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw new AppError('No images uploaded', 400);
  }

  // Check if product exists
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Get current max sort order
  const maxSortOrder = await prisma.productImage.findFirst({
    where: { productId: id },
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  });

  const startOrder = maxSortOrder ? maxSortOrder.sortOrder + 1 : 0;

  // Create image records
  const imagePromises = files.map((file, index) => {
    const url = `/uploads/${file.filename}`;
    return prisma.productImage.create({
      data: {
        productId: id,
        url,
        altText: product.name,
        sortOrder: startOrder + index,
        isPrimary: index === 0 && startOrder === 0, // First image is primary if no images exist
      },
    });
  });

  const images = await Promise.all(imagePromises);

  res.status(201).json({
    message: 'Images uploaded successfully',
    images,
  });
});
