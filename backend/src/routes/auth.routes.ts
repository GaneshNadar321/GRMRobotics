import { Router } from 'express';
import { authLimiter } from '../middleware/rateLimit';
import { validate, schemas } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/register', authLimiter, validate(schemas.register), authController.register);
router.post('/login', authLimiter, validate(schemas.login), authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/setup-admin', authController.setupAdmin);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword);

// OAuth routes
router.post('/google', authLimiter, authController.googleAuth);
router.post('/facebook', authLimiter, authController.facebookAuth);

// Profile routes (protected)
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);
router.put('/change-password', authenticate, authController.changePassword);

export default router;
