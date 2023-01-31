const joi = require('joi');
const { generateToken } = require('../utils/JWT');
const { user } = require('../models');

const loginSchemma = joi.object({
  email: joi.string().email().required(),
  password: joi.number().required(),
});

const getLogin = async (bodyInfo) => {
  const { error } = loginSchemma.validate(bodyInfo);
  if (error) {
    const errorObject = { status: 400, message: 'Some required fields are missing' };
    throw errorObject;
  }
  const User = await user.findOne({
    where: { email: bodyInfo.email, password: bodyInfo.password },
  });
  if (!User) {
    const errorObject = { status: 400, message: 'Invalid fields' };
    throw errorObject;
  }
  const token = generateToken(User.dataValues);
  return token;
};

module.exports = {
  getLogin,
};