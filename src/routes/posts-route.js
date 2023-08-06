import { Router } from 'express';
import { postsService, tokenHandler } from '../services';
import { postsValidator } from '../validators';

const postsRouter = Router();

// 새 게시글 생성
postsRouter.post(
  '/api/v1/posts',
  tokenHandler.verifyAccessToken,
  postsService.insertPost
);

// pagination으로 게시글 조회
postsRouter.get(
  '/api/v1/posts',
  tokenHandler.verifyAccessToken,
  postsValidator.pageData,
  postsService.getPostList
);

// 특정 게시글 조회
postsRouter.get('/api/v1/posts/:id');

// 특정 게시글 수정
postsRouter.put('/api/v1/posts/:id');

// 특정 게시글 삭제
postsRouter.delete('/api/v1/posts/:id');
export default postsRouter;
