import { Router } from 'express';
import { checkNickname, onboarding, getMyProfile, updateMyProfile } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/nickname/check', checkNickname);
router.post('/onboarding', authenticateToken, onboarding);
router.get('/me', authenticateToken, getMyProfile);
router.patch('/me', authenticateToken, updateMyProfile);

export default router;
