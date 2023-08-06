import { StatusCodes } from 'http-status-codes';
import { userModel, postModel } from '../db';
import { CustomError } from '../middlewares';

const postsService = {
  // POST /posts
  insertPost: async function (req, res, next) {
    try {
      const { title, content } = req.body;
      const { email } = req.decoded;

      const user = await userModel.findUserByEmail(email);
      await postModel.insertPost({
        author_id: user.id,
        title,
        content,
      });

      return res.status(StatusCodes.OK).json({
        message: '게시글이 작성됐습니다.',
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /posts
  getPostList: async function (req, res, next) {
    try {
      const { page, perPage } = req.query;
      const { email } = req.decoded;

      const user = await userModel.findUserByEmail(email);
      const postList = await postModel.getPostList({
        author_id: user.id,
        minimumIndex: (page - 1) * perPage + 1,
        maximumIndex: page * perPage,
      });
      if (!postList.length) {
        throw new CustomError(StatusCodes.NOT_FOUND, '게시글이 없습니다.');
      }

      return res.status(StatusCodes.OK).json({
        message: '게시글을 불러왔습니다.',
        data: { postList },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /posts/:id
  getPost: async function (req, res, next) {
    try {
      const { id } = req.params;

      const post = await postModel.getPostById(id);
      if (!post.length) {
        throw new CustomError(StatusCodes.NOT_FOUND, '게시글이 없습니다.');
      }

      return res.status(StatusCodes.OK).json({
        message: '게시글을 불러왔습니다.',
        data: { post },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default postsService;
