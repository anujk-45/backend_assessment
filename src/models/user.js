const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true, 
    required: true,
    trim: true,
    lowercase: true, 
    validate(value) {
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid')
        }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// Setting  a virtual key
userSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if(!user){
    console.log('user not found');
    throw new Error('Unable to login')
  }else {
    console.log(user);
  }
  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
    console.log('Password not matching');
    throw new Error('Unable to login')
  }
  console.log("is a match");
  return user
}

userSchema.methods.generateAuthToken = async (user) => {
    console.log('in here', user);
    const token = jwt.sign({_id: user._id.toString()}, 'helloWorld')
    console.log(token)
    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token
  }

const User = mongoose.model('User', userSchema)

module.exports = User