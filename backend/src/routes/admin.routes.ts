import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';
import * as adminController from '../controllers/admin.controller';

const router = Router();

// All routes require admin authentication
router.use(authenticate, authorize('ADMIN'));

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Users/Customers
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Products
router.get('/products', adminController.getProducts);
router.get('/products/:id', adminController.getProductById);
router.post('/products', upload.array('images', 5), adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Orders
router.get('/orders', adminController.getOrders);
router.get('/orders/:id', adminController.getOrderById);
router.put('/orders/:id', adminController.updateOrder);
router.delete('/orders/:id', adminController.deleteOrder);

// Tutorials
router.get('/tutorials', adminController.getTutorials);
router.post('/tutorials', adminController.createTutorial);
router.put('/tutorials/:id', adminController.updateTutorial);
router.delete('/tutorials/:id', adminController.deleteTutorial);

// Manuals
router.get('/manuals', adminController.getManuals);
router.get('/manuals/:id/download', adminController.downloadManual);
router.post('/manuals', upload.single('file'), adminController.createManual);
router.put('/manuals/:id', adminController.updateManual);
router.delete('/manuals/:id', adminController.deleteManual);

// Reviews
router.get('/reviews', adminController.getReviews);
router.put('/reviews/:id/approve', adminController.approveReview);
router.put('/reviews/:id/reject', adminController.rejectReview);
router.delete('/reviews/:id', adminController.deleteReview);

// Coupons
router.get('/coupons', adminController.getCoupons);
router.post('/coupons', adminController.createCoupon);
router.put('/coupons/:id', adminController.updateCoupon);
router.delete('/coupons/:id', adminController.deleteCoupon);

// Media
router.get('/media', adminController.getMedia);
router.post('/media', upload.array('files', 10), adminController.uploadMedia);
router.delete('/media/:id', adminController.deleteMedia);

// Messages
router.get('/messages', adminController.getMessages);
router.put('/messages/:id/read', adminController.markMessageAsRead);
router.delete('/messages/:id', adminController.deleteMessage);

// Analytics
router.get('/analytics/sales', adminController.getSalesAnalytics);
router.get('/analytics/products', adminController.getProductAnalytics);
router.get('/analytics/customers', adminController.getCustomerAnalytics);

export default router;
