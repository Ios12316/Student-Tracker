const Joi = require('joi');
const studentValidator = Joi.object({
    firstName: Joi.string().required().min(3).max(100),
    lastName: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(16),
    age: Joi.number().required().min(16).max(100),
    isEnrolled: Joi.boolean().required()
});
const checkedStudentsValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(16),
});
module.exports = {studentValidator,checkedStudentsValidator};