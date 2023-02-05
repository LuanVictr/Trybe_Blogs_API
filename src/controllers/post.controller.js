const postServices = require('../services/post.services');

const getAllPosts = async (_req, res) => {
    const result = await postServices.getAllPosts();
    res.status(200).send(result);
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await postServices.getPostById(id);
        res.status(200).send(result);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
};
module.exports = {
    getAllPosts,
    getPostById,
};