import db from '../index';

class AuthModel {
  // 사용자 생성
  createUser(userData) {
    const query = `
      INSERT INTO user (
        email, 
        password
        ) VALUES (?, ?)
    `;

    const result = db.query(query, userData);
    if (!result) {
      throw error();
    }
  }
}

const authModel = new AuthModel();

export default authModel;
