import { Router } from 'express';
import { authController } from '../controllers';
import { authValidator } from '../validators';

const authRouter = Router();

authRouter.post(
  '/api/v1/auth/users',
  authValidator.userSignUp,
  authController.createUser
);

export default authRouter;
