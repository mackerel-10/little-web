import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const postsValidator = {
  // pagination Validator
  checkPageData: async function (req, res, next) {
    try {
      const { page, perPage } = req.query;
      const schema = Joi.object().keys({
        page: Joi.string().required(),
        perPage: Joi.string().required(),
      });

      await schema.validateAsync({ page, perPage });
      next();
    } catch (error) {
      next({ statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  },

  // postId Validator
  checkPostId: async function (req, res, next) {
    try {
      const { id } = req.params;
      const schema = Joi.object().keys({
        id: Joi.number().required(),
      });

      await schema.validateAsync({ id });
      next();
    } catch (error) {
      next({ statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  },

  // postData 확인(title, content)
  checkPostData: async function (req, res, next) {
    try {
      const { title, content } = req.body;
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
      });

      await schema.validateAsync({ title, content });
      next();
    } catch (error) {
      next({ statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  },
};

export default postsValidator;
