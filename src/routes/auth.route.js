import { Router } from 'express';
import { kakaoLogin, appleLogin, logout, devLogin } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/kakao', kakaoLogin);
router.post('/apple', appleLogin);
router.post('/logout', authenticateToken, logout);
router.post('/dev-login', devLogin); // 개발용 임시 엔드포인트

export default router;
