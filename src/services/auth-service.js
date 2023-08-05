import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { authModel } from '../db';
import { CustomError } from '../middlewares';

class AuthService {
  async createUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await authModel.createUser([email, hashedPassword]);
      if (result[0].affectedRows <= 0) {
        throw new CustomError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          '회원가입에 실패했습니다.'
        );
      }

      res.status(StatusCodes.OK).json({
        message: '회원가입 했습니다.',
      });
    } catch (error) {
      next(error);
    }
  }
}

const authService = new AuthService();

export default authService;
