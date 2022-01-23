
const User = require('../models/user')


const getUser = async (req, res) => {
    const data = await User.find(req.params.id)
    if(data.length){
        res.status(200).json(data).send()
    }
    else{
        res.status(400).json({msg: "No data"}).send()
    }
}

const insertUser = async (req, res) => {
    console.log(req.body);
    if(req.body.name && req.body.password){
        
        const user = new User(req.body.name, req.body.password)

        if(user.save()){
            res.status(201).json({msg: "User added successfully"}).send()
        }
        else{
            res.status(200).json({msg: "Failed to add user"}).send()
        }
    }
    else{
        res.status(400).json({msg: "Must supply user name and password"}).send()
    }
    
}





module.exports = {
    getUser,
    insertUser
}