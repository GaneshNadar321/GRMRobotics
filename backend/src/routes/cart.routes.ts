import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validate, schemas } from '../middleware/validation';
import * as cartController from '../controllers/cart.controller';

const router = Router();

router.use(authenticate); // All cart routes require authentication

router.get('/', cartController.getCart);
router.post('/items', validate(schemas.addToCart), cartController.addToCart);
router.put('/items/:id', cartController.updateCartItem);
router.delete('/items/:id', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

export default router;
