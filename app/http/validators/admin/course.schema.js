const Joi = require('@hapi/joi');
const { MongoIDPattern } = require('../../../utils/constans');
const createError = require('http-errors');

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest('Title is required and must be between 3 and 30 characters')),
    text: Joi.string().error(createError.BadRequest('Text is not valid')),
    shortText: Joi.string().error(createError.BadRequest('Short text is not valid')),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest('Tags must be between 0 and 20 characters')),
    category: Joi.string().pattern(MongoIDPattern).error(createError.BadRequest('Category is not found')),
    price: Joi.number().error(createError.BadRequest('Price is not valid')),
    discount: Joi.number().error(createError.BadRequest('Count is not valid')),
    type: Joi.string().regex(/(free|cash|special)/i).error(createError.BadRequest('Type is not valid')),
    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest('Image is not valid')),
    fileUploadPath: Joi.allow(),
    
});

module.exports = {
    createCourseSchema
};