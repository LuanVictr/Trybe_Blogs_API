const Joi = require('joi');
const { user } = require('../models');
const { generateToken } = require('../utils/JWT');

const userCreationSchemma = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.number().min(6).required(),
    image: Joi.string(),
});

const createUser = async (creationInfo) => {
    const { error } = userCreationSchemma.validate(creationInfo);
    if (error) {
        const errorObject = { status: 400, message: error.message };
        throw errorObject;
    }
    const existentUSer = await user.findOne({
        where: { email: creationInfo.email },
    });
    if (existentUSer) {
        const errorObject = { status: 409, message: 'User already registered' };
        throw errorObject;
    }
    await user.create(creationInfo);
    const token = generateToken({
        displayName: creationInfo.displayName,
        email: creationInfo.email,
    });

    return token;
};

const getAllUsers = async () => {
    const users = await user.findAll();
    return users;
};

const getUserById = async (id) => {
    const result = await user.findByPK(id);
    if (!result) {
        const errorObject = { status: 404, message: 'User does not exist' };
        throw errorObject;
    }
    return result;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
};