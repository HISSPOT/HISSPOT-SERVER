import { Router } from 'express';
import { getMyProfile, updateMyProfile, deleteMyAccount } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/me', getMyProfile);
router.patch('/me', updateMyProfile);
router.delete('/me', deleteMyAccount);

export default router;
