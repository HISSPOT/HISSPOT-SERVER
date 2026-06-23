import { Router } from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import kingRouter from './king.route.js';
import collectionRouter from './collection.route.js';
import spotRouter from './spot.route.js';
import routeRouter from './route.route.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/kings', kingRouter);
router.use('/collections', collectionRouter);
router.use('/spots', spotRouter);
router.use('/routes', routeRouter);

export default router;
