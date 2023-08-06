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
        ORDER BY id
        LIMIT ?, ?;
      `;

      const connection = await db.getConnection();
      const queryData = [
        (postData.page - 1) * postData.perPage,
        Number(postData.perPage),
      ];
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

  // 특정 게시글 업데이트
  updatePost: async function (postData) {
    try {
      const query = `
        UPDATE post
        SET title = ?,
        content = ?
        WHERE author_id = ? AND id = ?;
      `;

      const connection = await db.getConnection();
      const queryData = [
        postData.title,
        postData.content,
        postData.author_id,
        postData.postId,
      ];
      const updateResult = await connection.query(query, queryData);
      connection.release();

      return updateResult[0];
    } catch (error) {
      throw new CustomError(error);
    }
  },

  // 특정 게시글 삭제
  deletePost: async function (postData) {
    try {
      const query = `
        DELETE
        FROM post
        WHERE author_id = ? AND id = ?;
      `;

      const connection = await db.getConnection();
      const queryData = [postData.author_id, postData.postId];
      const deleteResult = await connection.query(query, queryData);
      connection.release();

      return deleteResult[0];
    } catch (error) {
      throw new CustomError(error);
    }
  },
};

export default postModel;
