// Validation
const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
        type: Joi.number().min(1).required(),
        username: Joi.string().min(6).required()
    })       
        return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    })       
        return schema.validate(data)
}

const emailValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email()
    })
    return schema.validate(data)
}

const passwordValidation = (data) => {
    const schema = Joi.string().min(8)
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.emailValidation = emailValidation;
module.exports.passwordValidation = passwordValidation;
