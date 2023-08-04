import { StatusCodes } from 'http-status-codes';
import { authModel } from '../db';

class AuthController {
  createUser(req, res, next) {
    try {
      const { email, password } = req.body;

      authModel.createUser([email, password]);

      res.status(StatusCodes.OK).json({
        message: '회원가입 했습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();

export default authController;
