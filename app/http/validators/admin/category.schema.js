const Joi = require('@hapi/joi');
const { MongoIDPattern } = require('../../../utils/constans');

const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('The Name of category invalid.')),
    parent: Joi.string().pattern(MongoIDPattern).allow('').error(new Error('The id is invalid.'))
});
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('The Name of category invalid.'))
});

module.exports = {
    addCategorySchema,
    updateCategorySchema
};