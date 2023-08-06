import { Router } from 'express';
import authRouter from './auth-route';
import postsRouter from './post-route';

const router = Router();

router.use(authRouter);
router.use(postsRouter);

export default router;
