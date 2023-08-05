import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

class AuthValidator {
  // 사용자 정보 Validator
  async userData(req, res, next) {
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
  }
}

const authValidator = new AuthValidator();

export default authValidator;
