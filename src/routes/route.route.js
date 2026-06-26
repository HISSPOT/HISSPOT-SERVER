import { Router } from 'express';
import { getRoutesByKing, getRouteById, getMySavedRoutes, saveRoute, unsaveRoute } from '../controllers/route.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getRoutesByKing);
router.get('/me', getMySavedRoutes);
router.post('/me/:routeId', saveRoute);
router.delete('/me/:routeId', unsaveRoute);
router.get('/:routeId', getRouteById);

export default router;
