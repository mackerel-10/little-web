import { db } from '../index';

class AuthModel {
  // 사용자 생성
  async createUser(userData) {
    const query = `
      INSERT INTO user (
        email, 
        password
        ) VALUES (?, ?);
    `;

    const connection = await db.getConnection();
    const insertResult = await connection.query(query, userData);
    connection.release();

    return insertResult;
  }

  // 이메일로 사용자 검색
  async findUserByEmail(email) {
    const query = `
      SELECT *
      FROM user
      WHERE email = "${email}";
    `;

    const connection = await db.getConnection();
    const selectResult = await connection.query(query);
    connection.release();

    return selectResult[0][0];
  }
}

const authModel = new AuthModel();

export default authModel;
