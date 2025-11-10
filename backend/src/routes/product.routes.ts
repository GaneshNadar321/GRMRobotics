import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';
import * as productController from '../controllers/product.controller';

const router = Router();

router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.post('/create-categories', productController.createCategories);
router.get('/:id', productController.getProductById);
router.get('/:id/tutorials', productController.getProductTutorials);
router.get('/:id/manuals', productController.getProductManuals);

// Admin routes
router.post('/', authenticate, authorize('ADMIN'), productController.createProduct);
router.put('/:id', authenticate, authorize('ADMIN'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN'), productController.deleteProduct);
router.post('/:id/images', authenticate, authorize('ADMIN'), upload.array('images', 10), productController.uploadProductImages);
router.post('/:id/tutorials', authenticate, authorize('ADMIN'), productController.addTutorial);
router.post('/:id/manuals', authenticate, authorize('ADMIN'), upload.single('file'), productController.addManual);

export default router;
