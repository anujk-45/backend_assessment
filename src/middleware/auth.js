const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
  try{
    var parts = req.header('Authorization').split(' ');
    if(parts.length !== 2 || parts[0] !== 'Bearer'){
        console.log('invalid')
        throw new Error('Invalid token type used');
    }
    const token = parts[1]
    const decoded = jwt.verify(token, 'helloWorld');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

    if(!user){
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch(e) {
    res.status(401).send({error: 'Please Authenticate'})
  }
}

module.exports = auth;