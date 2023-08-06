import { db } from '../index';

const userModel = {
  // 사용자 생성
  createUser: async function (userData) {
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
  },

  // 이메일로 사용자 검색
  findUserByEmail: async function (email) {
    const query = `
      SELECT *
      FROM user
      WHERE email = "${email}";
    `;

    const connection = await db.getConnection();
    const selectResult = await connection.query(query);
    connection.release();

    return selectResult[0][0];
  },
};

export default userModel;
