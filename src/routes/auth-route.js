import { Router } from 'express';
import { authService } from '../services';
import { authValidator } from '../validators';

const authRouter = Router();

// 회원가입 API
authRouter.post(
  '/api/v1/auth/users',
  authValidator.userData,
  authService.insertUser
);

// 로그인 API
authRouter.post(
  '/api/v1/auth/signin',
  authValidator.userData,
  authService.signIn
);

export default authRouter;
