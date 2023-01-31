const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const generateToken = ({ email, password }) => {
    const token = jwt.sign({ email, password }, secret, jwtConfig);
    return token;
};

const authenticateToken = async (token) => {
    if (!token) {
        const error = new Error('missing auth token');
        error.status = 401;
        throw error;
    }

    try {
        const decriptedData = await jwt.verify(token, secret);
        return decriptedData;
    } catch (err) {
        const error = new Error('Malformed token');
        error.status = 401;
        throw error;
    }
};

module.exports = {
    generateToken,
    authenticateToken,
};