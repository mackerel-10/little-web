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
    const createResult = db.query(query, userData);

    return createResult;
  }
}

const authModel = new AuthModel();

export default authModel;
