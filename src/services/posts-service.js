import { StatusCodes } from 'http-status-codes';
import { userModel } from '../db';

const postsService = {
  insertPost: async function (req, res, next) {
    try {
      const { title, content } = req.body;

      return res.status(StatusCodes.OK).json({
        message: '게시글이 작성됐습니다.',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default postsService;
