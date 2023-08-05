import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { authModel } from '../db';

class AuthService {
  async createUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = authModel.createUser([email, hashedPassword]);

      console.log(result);
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
