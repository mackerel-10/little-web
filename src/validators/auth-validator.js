import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const authValidator = {
  // 사용자 정보 Validator
  userData: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });

      await schema.validateAsync({ email, password });
      next();
    } catch (error) {
      next({ statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  },
};

export default authValidator;
