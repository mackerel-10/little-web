import { CustomError } from '../../middlewares';
import { db } from '../index';

const postModel = {
  insertPost: async function (postData) {
    try {
      const query = `
        INSERT INTO post (
        author_id,
        title, 
        content
        ) VALUES (?, ?, ?);
      `;

      const connection = await db.getConnection();
      const queryData = Object.values(postData);
      const insertResult = await connection.query(query, queryData);
      connection.release();

      return insertResult;
    } catch (error) {
      throw new CustomError(error);
    }
  },
};

export default postModel;
