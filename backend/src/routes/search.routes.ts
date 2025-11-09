import { Router } from 'express';
import * as searchController from '../controllers/search.controller';

const router = Router();

router.get('/', searchController.searchProducts);

export default router;
