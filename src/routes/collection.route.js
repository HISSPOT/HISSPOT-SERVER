import { Router } from 'express';
import { getMyCollections, collectKing } from '../controllers/collection.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getMyCollections);
router.post('/:kingId', collectKing);

export default router;
