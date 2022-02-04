const jwt = require('jsonwebtoken')



function authenticate(req, res) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send({msg: 'Access Denied'})
    try{
        const user = jwt.verify(token, process.env.TOKEN_SECRET)
        return user
    }
    catch(err){
        return res.status(400).send({msg: 'Invalid Token'})
    }
}


exports.verifyOwner = (req, res, next) => {
    const user = authenticate(req, res)
    if(!("iat" in user)) return user
    if(user.role !== 'owner') return res.status(403).send({msg: 'Insufficient privliges'})
    req.user = user
    next()
}

exports.verifyCustomer = (req, res, next) => {
    const user = authenticate(req, res)
    if(!("iat" in user)) return user
    if(user.role !== 'customer') return res.status(403).send({msg: 'Insufficient privliges'})
    req.user = user
    next()
}

exports.verifySameUser = (req, res, next) => {
    const user = authenticate(req, res)
    if(!("iat" in user)) return user
    if(req.body.email !== user.email) return res.status(403).send({msg: 'Insufficient privliges'})
    req.user = user
    next()
}

