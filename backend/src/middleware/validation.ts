import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};

// Common validation schemas
export const schemas = {
  register: z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      phone: z.string().optional(),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(1, 'Password is required'),
    }),
  }),

  createProduct: z.object({
    body: z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.number().positive(),
      sku: z.string().min(1),
      stock: z.number().int().min(0),
      categoryId: z.string().uuid(),
      difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
    }),
  }),

  addToCart: z.object({
    body: z.object({
      productId: z.string().uuid('Invalid product ID'),
      quantity: z.number().int().positive('Quantity must be a positive number'),
    }),
  }),

  createReview: z.object({
    body: z.object({
      productId: z.string().uuid(),
      rating: z.number().int().min(1).max(5),
      title: z.string().optional(),
      comment: z.string().min(1),
    }),
  }),
};
