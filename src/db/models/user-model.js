import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../middlewares';
import { db } from '../index';

const userModel = {
  // 사용자 생성
  createUser: async function (userData) {
    try {
      const query = `
      INSERT INTO user (
        email, 
        password
        ) VALUES (?, ?);
    `;

      const connection = await db.getConnection();
      const queryData = Object.values(userData);
      const insertResult = await connection.query(query, queryData);
      connection.release();

      return insertResult;
    } catch (error) {
      throw new CustomError(error);
    }
  },

  // 이메일로 사용자 검색
  findUserByEmail: async function (email) {
    try {
      const query = `
        SELECT *
        FROM user
        WHERE email = "${email}";
      `;

      const connection = await db.getConnection();
      const selectResult = await connection.query(query);
      connection.release();

      return selectResult[0][0];
    } catch (error) {
      throw new CustomError(error);
    }
  },
};

export default userModel;
