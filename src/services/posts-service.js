import { StatusCodes } from 'http-status-codes';
import { userModel, postModel } from '../db';

const postsService = {
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
};

export default postsService;
