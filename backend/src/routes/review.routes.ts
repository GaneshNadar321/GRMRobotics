import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as reviewController from '../controllers/review.controller';

const router = Router();

router.get('/product/:productId', reviewController.getProductReviews);
router.get('/user/:productId', authenticate, reviewController.getUserReview);
router.post('/', authenticate, reviewController.createReview);
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

// Admin routes
router.put('/:id/approve', authenticate, authorize('ADMIN'), reviewController.approveReview);

export default router;
