import { Router } from 'express';
import { downloadPublicManual } from '../controllers/manual.controller';

const router = Router();

// Public manual download (no auth required)
router.get('/:id/download', downloadPublicManual);

export default router;