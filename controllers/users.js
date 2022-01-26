const User = require('../models/user')
const { registerValidation } = require('../utilities/validations/user')
require('../utilities/validations/user')

exports.getUser = async (req, res) => {

    const data = await User.find(req.body)
    if(!data){
        res.status(500).json({msg: 'Server error'}).send()
    }
    else{
        if(data.length){
            res.status(200).json(data).send()
        }
        else{
            res.set('msg', ['No Data']).status(204).send()
        }
    }
}

exports.createUser = async (req, res) => {

    // Validating data
    const validationError = registerValidation(req.body)
    if(validationError) return res.status(400).json({msg: validationError}).send()
    
    // Checking if user exists
    const findEmail = await User.find({email : req.body.email})
    const userExists = findEmail.length
    if(userExists) return res.status(400).json({msg: 'Email already in use'}).send()

    // Attempting to add user
    const savedUser = await new User(req.body).save()
    console.log(savedUser);
    if(savedUser) return res.status(200).json({msg: 'User added successfully'}).send()
    else return res.status(500).json({msg: 'Failed to add user'}).send()
}

exports.updateUser = async (req, res) => {}

exports.deleteUser = async (req, res) => {}

exports.login = async (req, res) => {}

exports.logout = async (req, res) => {}


