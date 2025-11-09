import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as orderController from '../controllers/order.controller';

const router = Router();

router.use(authenticate);

router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

// Admin routes
router.put('/:id/status', authorize('ADMIN'), orderController.updateOrderStatus);

export default router;
