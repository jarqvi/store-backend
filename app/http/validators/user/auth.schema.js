const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(new Error('Mobile is not valid.')),
});

module.exports = {
    authSchema
};