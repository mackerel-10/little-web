import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const postsValidator = {
  // pagination Validator
  pageData: async function (req, res, next) {
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
        id: Joi.string().required(),
      });

      await schema.validateAsync({ id });
      next();
    } catch (error) {
      next({ statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  },
};

export default postsValidator;
