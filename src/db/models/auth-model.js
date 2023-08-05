import db from '../index';

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
    const result = await connection.query(query, userData);
    connection.release();

    return result;
  }
}

const authModel = new AuthModel();

export default authModel;
