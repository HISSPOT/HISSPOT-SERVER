import { Router } from 'express';
import { getAllRoutes, getRouteById, completeRoute } from '../controllers/route.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllRoutes);
router.get('/:routeId', getRouteById);
router.post('/:routeId/complete', completeRoute);

export default router;
