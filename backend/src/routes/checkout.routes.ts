import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { checkoutLimiter } from '../middleware/rateLimit';
import * as checkoutController from '../controllers/checkout.controller';

const router = Router();

router.use(authenticate);

router.post('/create-order', checkoutLimiter, checkoutController.createOrder);
router.post('/verify', checkoutController.verifyPayment);
router.post('/confirm-cod', checkoutController.confirmCODOrder);
router.post('/apply-coupon', checkoutController.applyCoupon);

export default router;
