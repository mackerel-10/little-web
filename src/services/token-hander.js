import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { redisClient } from '../db';

class TokenHandler {
  // Access Token 발급
  generateAccessToken(email) {
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
  }

  // Refresh Token 발급
  async generateRefreshToken() {
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

    // Redis에 저장(만료기간 설정)
    const refreshTokenKey = `refresh_${refreshId}`;
    const setResult = await redisClient.set(refreshTokenKey, newRefreshToken);
    const expireResult = await redisClient.expire(
      refreshTokenKey,
      Number(process.env.REFRESH_REDIS_EXPIRE)
    );
    if (!setResult || !expireResult) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'Redis 저장 실패');
    }

    return newRefreshToken;
  }
}

const tokenHandler = new TokenHandler();

export default tokenHandler;
