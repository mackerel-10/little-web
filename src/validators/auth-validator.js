import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const authValidator = {
  userSignUp: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });

      await schema.validateAsync({ email, password });
    } catch (error) {
      next({ statusCode: StatusCodes.BAD_REQUEST, message: error.message });
    }
  },
};

export default authValidator;
