import { Router } from 'express';
import { authService } from '../services';
import { authValidator } from '../validators';

const authRouter = Router();

authRouter.post(
  '/api/v1/auth/users',
  authValidator.userData,
  authService.createUser
);

export default authRouter;
