import { Router } from 'express';
import authRouter from './auth-route';

const router = Router();

router.use('/api/v1', authRouter);

export default router;
