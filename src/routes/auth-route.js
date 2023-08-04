import { Router } from 'express';
import { authController } from '../controllers';

const authRouter = Router();

authRouter.post('/auth/users', authController.createUser);

export default authRouter;
