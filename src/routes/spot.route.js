import { Router } from 'express';
import { getAllSpots, getSpotsByKing, getNearbySpots, checkDistance } from '../controllers/spot.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllSpots);
router.get('/:kingId', getSpotsByKing);
router.get('/:spotId/nearby', getNearbySpots);
router.post('/:spotId/check-distance', checkDistance);

export default router;
