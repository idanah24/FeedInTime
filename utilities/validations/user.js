const Joi = require('@hapi/joi')



exports.registerValidation = data => {
    const schema = Joi.object
    ({
        email : Joi.string().required().email(),
        name : Joi.string().required().min(2),
        password : Joi.string().required().min(8),
        role: Joi.string().required().valid('customer', 'owner')
    })
    const validation = schema.validate(data)
    return validation.error ? validation.error.details[0].message : ''
}

// exports.loginValidation = data => {
//     const schema = Joi.object
//     ({
//         email : Joi.string().required().email(),
//         name : Joi.string().required().min(2),
//         password : Joi.string().required().min(8),
//         role: Joi.string().required().valid('customer', 'owner')
//     })
//     const validation = schema.validate(data)
//     return validation.error ? validation.error.details[0].message : ''
// }

const myObj = {
    email : Joi.string().required().email(),
    name : Joi.string().required().min(2),
    password : Joi.string().required().min(8),
    role: Joi.string().required().valid('customer', 'owner')
}

delete myObj.email