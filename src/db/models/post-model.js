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
      await connection.query(query, queryData);
      connection.release();
    } catch (error) {
      throw new CustomError(error);
    }
  },

  getPostList: async function (postData) {
    try {
      const query = `
        SELECT *
        FROM post
        WHERE author_id = ?
        AND id BETWEEN ? AND ?;
      `;

      const connection = await db.getConnection();
      const queryData = Object.values(postData);
      const postList = await connection.query(query, queryData);
      connection.release();

      return postList[0];
    } catch (error) {
      throw new CustomError(error);
    }
  },
};

export default postModel;
