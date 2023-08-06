import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { authModel } from '../db';
import { CustomError } from '../middlewares';
import { tokenHandler } from './';

const authService = {
  // POST /auth/users
  insertUser: async function (req, res, next) {
    try {
      const { email, password } = req.body;

      // 중복 사용자 검색
      const user = await authModel.findUserByEmail(email);
      if (user) {
        throw new CustomError(StatusCodes.BAD_REQUEST, '사용자가 있습니다.');
      }

      // 해쉬 비밀번호 생성
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

      return res.status(StatusCodes.OK).json({
        message: '회원가입 했습니다.',
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /auth/signin
  signIn: async function (req, res, next) {
    try {
      const { email, password } = req.body;

      // 사용자 DB 검색
      const user = await authModel.findUserByEmail(email);
      if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, '사용자가 업습니다.');
      }

      // 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          '잘못된 비밀번호 입니다.'
        );
      }

      // 토큰 발급
      const refreshToken = await tokenHandler.generateRefreshToken();
      const accessToken = tokenHandler.generateAccessToken(email);

      res.header('X-Refresh-Token', `Bearer ${refreshToken}`);
      res.header('Authorization', `Bearer ${accessToken}`);
      return res.status(StatusCodes.OK).json({
        message: '로그인 했습니다.',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authService;
