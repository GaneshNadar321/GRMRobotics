import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as wishlistController from '../controllers/wishlist.controller';

const router = Router();

// All wishlist routes require authentication
router.use(authenticate);

router.get('/', wishlistController.getWishlist);
router.post('/items', wishlistController.addToWishlist);
router.delete('/items/:productId', wishlistController.removeFromWishlist);
router.delete('/', wishlistController.clearWishlist);

export default router;
