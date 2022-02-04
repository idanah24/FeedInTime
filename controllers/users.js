const User = require('../models/user');
const { registerValidation, loginValidation } = require('../utilities/validations/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../utilities/validations/user');

require('dotenv').config()


exports.getUser = async (req, res) => {

    const data = await User.find(req.body)

    if(data === null){
        res.status(500).json({msg: 'Server error'}).send()
    }
    else if(data === undefined){
        res.set('msg', ['No Data']).status(204).send()
    }
    else{
        res.status(200).json(data).send()
    }
}

exports.createUser = async (req, res) => {

    // Validating data
    const validationErrors = registerValidation(req.body)
    if(validationErrors) return res.status(400).json({errors: validationErrors}).send()
    
    // Checking if user exists
    const userExists = await User.find({email : req.body.email})
    if(userExists) return res.status(400).json({msg: 'Email already in use'}).send()

    // Create user
    const user = new User(req.body)

    // Hash password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    // Attempting to add user
    const savedUser = await user.save()
    if(savedUser){
        // Keep new user logged
        const token = jwt.sign({name: user.name, email: user.email, role : user.role}, process.env.TOKEN_SECRET)
        return res.header('auth-token', token).status(200).send({msg: 'User registered successfully'})
    }
    else{
        return res.status(500).json({msg: 'Failed to add user'}).send()
    }
}

exports.updateUser = async (req, res) => {


}

exports.deleteUser = async (req, res) => {

    return res.status(201).send('Authentication valid')
}

exports.login = async (req, res) => {
    // Validating data
    const validationErrors = loginValidation(req.body)
    if(validationErrors) return res.status(200).json({msg: validationErrors}).send()

    // Checking if user exists
    const user = await User.find({email : req.body.email})
    if(!user) return res.status(400).json({msg: 'Incorrect email or password'}).send()

    // Comparing password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).json({msg: 'Incorrect email or password'}).send()
    
    // Create token
    const token = jwt.sign({name: user.name, email: user.email, role : user.role}, process.env.TOKEN_SECRET)
    return res.header('auth-token', token).status(200).send({msg: 'Login successfully'})
}

exports.logout = async (req, res) => {


}


