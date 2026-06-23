import { Router } from 'express';
import { getNearbySpots, getSpotById } from '../controllers/spot.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/nearby', getNearbySpots);
router.get('/:spotId', getSpotById);

export default router;
