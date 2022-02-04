const Joi = require('@hapi/joi')

const modelSchema = {
    email : Joi.string().required().email(),
    name : Joi.string().required().min(2),
    password : Joi.string().required().min(8),
    role: Joi.string().required().valid('customer', 'owner', 'admin')
}

function validationResult(validation){
    return 'error' in validation ? validation.error.details.map(error => {return error.message.replaceAll('"', '')}) : false
}

exports.registerValidation = data => {
    const schema = Joi.object(modelSchema)
    const validation = schema.validate(data, {abortEarly : false})
    return validationResult(validation)

}

exports.loginValidation = data => {
    const schema = { email : modelSchema.email, password : modelSchema.password }
    const validation = Joi.object(schema).validate(data)
    return validationResult(validation)
}
