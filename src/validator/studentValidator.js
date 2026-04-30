const Joi = require('joi');
const studentValidator = Joi.object({
    firstName: Joi.string().required().min(3).max(100),
    lastName: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    age: Joi.number().required().min(16).max(100),
    studentId: Joi.string().required(),
    isEnrolled: Joi.boolean().required(),
    enrolledAt: Joi.date().required()
});
module.exports = studentValidator;