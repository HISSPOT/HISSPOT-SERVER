import { Router } from 'express';
import { getAllKings, getKingById } from '../controllers/king.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllKings);
router.get('/:kingId', getKingById);

export default router;
