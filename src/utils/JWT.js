const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const generateToken = ({ email, password }) => {
    const token = jwt.sign({ email, password }, secret, jwtConfig);
    return token;
};

const authenticateToken = async (token) => {
    try {
        if (!token) {
            const errorObject = { status: 401, message: 'Token not found' };
            throw errorObject;
        }
            const decriptedData = await jwt.verify(token, secret);
            return decriptedData;
        } catch (err) {
        const errorObject = { status: 401, message: 'Expired or invalid token' };
        throw errorObject;
    }
};

module.exports = {
    generateToken,
    authenticateToken,
};