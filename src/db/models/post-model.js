import { CustomError } from '../../middlewares';
import { db } from '../index';

const postModel = {
  // 게시글 생성
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

  // 게시글 리스트 가져오기(pagination 적용)
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

  // 특정 게시글 조회
  getPostById: async function (postId) {
    try {
      const query = `
        SELECT *
        FROM post
        WHERE id = ${postId};
      `;

      const connection = await db.getConnection();
      const post = await connection.query(query);
      connection.release();

      return post[0];
    } catch (error) {
      throw new CustomError(error);
    }
  },
};

export default postModel;
