import { Router } from 'express';
import { collectKing } from '../controllers/collection.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.post('/:kingId', collectKing);

export default router;
