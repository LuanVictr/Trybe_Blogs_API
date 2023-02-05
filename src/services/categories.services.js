const joi = require('joi');
const { Category } = require('../models');

const categorySchemma = joi.object({
    name: joi.string().required(),
});

const createCategory = async (categoryName) => {
    const { error } = categorySchemma.validate(categoryName);
    if (error) {
        const errorObject = { status: 400, message: error.message };
        throw errorObject;
    }
    const result = await Category.create(categoryName);
    return result.dataValues;
};

const getCategories = async () => {
    const result = await Category.findAll();
    return result;
};

module.exports = {
    createCategory,
    getCategories,
};