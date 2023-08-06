import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middlewares';

const tokenHandler = {
  // Access Token 발급
  generateAccessToken: function (email) {
    const newAccessToken = jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        issuer: process.env.ISSUER,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      }
    );

    return newAccessToken;
  },

  // Refresh Token 발급
  generateRefreshToken: async function () {
    // Refresh Token 발급
    const refreshId = v4();
    const newRefreshToken = jwt.sign(
      {
        type: 'refresh',
        refreshId,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        issuer: process.env.ISSUER,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
      }
    );

    return newRefreshToken;
  },

  // Access Token 검증 미들웨어
  verifyAccessToken: async function (req, res, next) {
    try {
      const authHeader = req.header('Authorization');
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;
      if (!accessToken) {
        throw new CustomError(
          StatusCodes.UNAUTHORIZED,
          'Access Token이 없습니다.'
        );
      }

      // Access Token 만료됐는지 확인
      const decodedAccessToken = jwt.decode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedAccessToken.exp <= currentTime) {
        throw new CustomError(
          StatusCodes.UNAUTHORIZED,
          'Access Token을 새로 발급받아주세요.'
        );
      }

      req.decoded = decodedAccessToken;
      console.log('🪙 Access Token has been verified!');

      next();
    } catch (error) {
      next(error);
    }
  },
};

export default tokenHandler;
