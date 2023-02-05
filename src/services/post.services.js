const { Category, User, BlogPost } = require('../models');

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return posts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findByPk(id, {
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    if (!post) {
        const errorObject = { status: 404, message: 'Post does not exist' };
        throw errorObject;
    }
    return post;
};

module.exports = {
    getAllPosts,
    getPostById,
};