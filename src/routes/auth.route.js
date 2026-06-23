import { Router } from 'express';
import { signUp, signIn, reissueToken, signOut } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/reissue', reissueToken);
router.post('/signout', authenticateToken, signOut);

export default router;
