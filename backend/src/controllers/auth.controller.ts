import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
} from '../utils/jwt';
import { sendPasswordResetEmail, sendWelcomeEmail } from '../utils/email';

const prisma = new PrismaClient();
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10');

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phone } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    },
  });

  // Create empty cart for user
  await prisma.cart.create({
    data: { userId: user.id },
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  await sendWelcomeEmail(user.email, user.firstName);

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    accessToken,
    refreshToken,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    accessToken,
    refreshToken,
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token required', 400);
  }

  const payload = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const newAccessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  res.json({
    accessToken: newAccessToken,
  });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Don't reveal if user exists
    res.json({ message: 'If the email exists, a reset link has been sent' });
    return;
  }

  const resetToken = generatePasswordResetToken(user.id);
  const resetExpires = new Date(Date.now() + 3600000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    },
  });

  await sendPasswordResetEmail(user.email, resetToken);

  res.json({ message: 'If the email exists, a reset link has been sent' });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new AppError('Token and new password required', 400);
  }

  const { userId } = verifyPasswordResetToken(token);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.resetPasswordToken !== token) {
    throw new AppError('Invalid or expired reset token', 400);
  }

  if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
    throw new AppError('Reset token has expired', 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  res.json({ message: 'Password reset successful' });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      isEmailVerified: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json(user);
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { firstName, lastName, phone, email } = req.body;

  // Check if email is being changed and if it's already taken
  if (email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      phone,
      email,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
    },
  });

  res.json({
    message: 'Profile updated successfully',
    user: updatedUser,
  });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError('Current password and new password required', 400);
  }

  if (newPassword.length < 8) {
    throw new AppError('New password must be at least 8 characters', 400);
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError('Current password is incorrect', 401);
  }

  const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  res.json({ message: 'Password changed successfully' });
});
// Google OAuth Login
export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    throw new AppError('Access token is required', 400);
  }

  try {
    // Verify Google access token and get user info
    const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
    
    if (!googleResponse.ok) {
      throw new AppError('Invalid Google access token', 401);
    }

    const googleUser: any = await googleResponse.json();

    if (!googleUser.email) {
      throw new AppError('Email not provided by Google', 400);
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          firstName: googleUser.given_name || googleUser.name?.split(' ')[0] || 'User',
          lastName: googleUser.family_name || googleUser.name?.split(' ').slice(1).join(' ') || '',
          password: '', // No password for OAuth users
          isEmailVerified: true, // Google emails are verified
          provider: 'GOOGLE',
          providerId: googleUser.id,
        },
      });

      // Create empty cart for new user
      await prisma.cart.create({
        data: { userId: user.id },
      });

      // Send welcome email
      try {
        await sendWelcomeEmail(user.email, user.firstName);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
    } else if (!user.provider || user.provider !== 'GOOGLE') {
      // Link Google account to existing user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          provider: 'GOOGLE',
          providerId: googleUser.id,
          isEmailVerified: true,
        },
      });
    }

    const accessTokenJWT = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      message: 'Google login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken: accessTokenJWT,
      refreshToken,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    throw new AppError('Google authentication failed', 500);
  }
});

// Facebook OAuth Login
export const facebookAuth = asyncHandler(async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    throw new AppError('Access token is required', 400);
  }

  try {
    // Verify Facebook access token and get user info
    const facebookResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,first_name,last_name&access_token=${accessToken}`);
    
    if (!facebookResponse.ok) {
      throw new AppError('Invalid Facebook access token', 401);
    }

    const facebookUser: any = await facebookResponse.json();

    if (!facebookUser.email) {
      throw new AppError('Email not provided by Facebook', 400);
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: facebookUser.email },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: facebookUser.email,
          firstName: facebookUser.first_name || facebookUser.name?.split(' ')[0] || 'User',
          lastName: facebookUser.last_name || facebookUser.name?.split(' ').slice(1).join(' ') || '',
          password: '', // No password for OAuth users
          isEmailVerified: true, // Facebook emails are verified
          provider: 'FACEBOOK',
          providerId: facebookUser.id,
        },
      });

      // Create empty cart for new user
      await prisma.cart.create({
        data: { userId: user.id },
      });

      // Send welcome email
      try {
        await sendWelcomeEmail(user.email, user.firstName);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
    } else if (!user.provider || user.provider !== 'FACEBOOK') {
      // Link Facebook account to existing user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          provider: 'FACEBOOK',
          providerId: facebookUser.id,
          isEmailVerified: true,
        },
      });
    }

    const accessTokenJWT = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      message: 'Facebook login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken: accessTokenJWT,
      refreshToken,
    });
  } catch (error) {
    console.error('Facebook auth error:', error);
    throw new AppError('Facebook authentication failed', 500);
  }
});