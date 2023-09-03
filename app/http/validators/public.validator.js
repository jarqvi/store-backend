const Joi = require('@hapi/joi');
const { MongoIDPattern } = require('../../utils/constans');
const createError = require('http-errors');


const ObjectIdValidator = Joi.object({
    id: Joi.string().pattern(MongoIDPattern).error(new Error(createError.BadRequest('Id is not valid')))
});

module.exports = {
    ObjectIdValidator
};