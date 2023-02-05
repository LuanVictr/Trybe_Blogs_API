const Joi = require('joi');
const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const userCreationSchemma = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(/^[0-9]+$/).required(),
    image: Joi.string(),
});

const createUser = async (creationInfo) => {
    const { error } = userCreationSchemma.validate(creationInfo);
    if (error) {
        const errorObject = { status: 400, message: error.message };
        throw errorObject;
    }
    const existentUSer = await User.findOne({
        where: { email: creationInfo.email },
    });
    if (existentUSer) {
        const errorObject = { status: 409, message: 'User already registered' };
        throw errorObject;
    }
    await User.create(creationInfo);
    const token = generateToken({
        displayName: creationInfo.displayName,
        email: creationInfo.email,
    });

    return token;
};

const getAllUsers = async () => {
    const users = await User.findAll();
    const result = users.map(
        ({ id, displayName, email, image }) => ({ id, displayName, email, image }),
);
    return result;
};

const getUserById = async (id) => {
    const result = await User.findByPk(id);
    if (!result) {
        const errorObject = { status: 404, message: 'User does not exist' };
        throw errorObject;
    }
    delete result.dataValues.password;
    return result;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
};