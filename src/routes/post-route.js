import { Router } from 'express';
import { postsService, tokenHandler } from '../services';

const postsRouter = Router();

postsRouter.post(
  '/api/v1/posts',
  tokenHandler.verifyAccessToken,
  postsService.insertPost
);

export default postsRouter;
