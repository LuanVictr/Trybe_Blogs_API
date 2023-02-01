const { authenticateToken } = require('../utils/JWT');

const authenticate = async (req, res, next) => {
    try {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const user = await authenticateToken(token);
    res.locals.user = user;
    next();
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = authenticate;