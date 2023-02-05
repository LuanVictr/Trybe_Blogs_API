const categoriesServices = require('../services/categories.services');

const createCategory = async (req, res) => {
    try {
        const categoryName = req.body;
        const result = await categoriesServices.createCategory(categoryName);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
    }
};

const getCategories = async (_req, res) => {
    const result = await categoriesServices.getCategories();
    res.status(200).send(result);
};

module.exports = {
    createCategory,
    getCategories,
};