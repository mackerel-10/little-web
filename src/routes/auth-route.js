import { Router } from 'express';
import { authController } from '../controllers';

const authRouter = Router();

authRouter.post('/api/v1/auth/users', authController.createUser);

export default authRouter;
