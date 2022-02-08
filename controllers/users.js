const User = require('../models/user');
const { registerValidation, loginValidation, updateValidation, deleteValidation } = require('../utilities/validations/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express/lib/response');

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
    // Verify new data supplied
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) return res.status(400).json({msg: "No new data to update"}).send()

    // Validate data
    const validationErrors = updateValidation(req.body)
    if(validationErrors) return res.status(400).json({errors: validationErrors}).send()

    // Hash password if given
    if('password' in req.body){ 
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    // Determine updated entry
    const changeId = req.user.role === 'admin' ? req.body.email : req.user.email

    // Attempting to update
    const updated = await User.update(changeId, req.body)
    if(!updated) return res.status(500).json({msg: "Failed to update information"}).send()

    // Information updated
    return res.status(200).json({msg: "User updated successfully"}).send()
}

exports.deleteUser = async (req, res) => {
    let email = ''
    // Determine delete entry
    if(req.user.role === 'admin'){
        
        const validationErrors = deleteValidation(req.body)
        if(validationErrors) return res.status(400).json({errors: validationErrors}).send()
        email = req.body.email
    }
    else{
        email = req.user.email
    }

    const deleted = await User.delete(email)
    if(!deleted) return 0


    return res.status(200).json({msg: "User removed successfully"}).send()
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

// TODO: Implement logout on client-side
exports.logout = async (req, res) => {


}


