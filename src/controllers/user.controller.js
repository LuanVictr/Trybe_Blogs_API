const userServices = require('../services/user.services');

const createUser = async (req, res) => {
    try { 
    const creationInfo = req.body;
    const result = await userServices.createUser(creationInfo);
    res.status(201).json({ token: result });
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
};

const getAllUsers = async (_req, res) => {
    const result = await userServices.getAllUsers();
    res.status(200).send(result);
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userServices.getUserById(id);
        res.status(200).send(result);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
};