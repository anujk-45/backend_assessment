const express = require('express')
const router = new express.Router()
const cors = require('cors')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/login', cors(), async (req, res) => {
  try{   
    const user = await User.findByCredentials(req.body.email, req.body.password)
    console.log('user',user)
    const token = await user.generateAuthToken(user)
    res.send({user, token}) //which is to be used to make request from fronted.
  } catch(e) {
    res.status(400).send(e)
  }
})

router.get('/logout', cors(), auth, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token //deleting that particular accessToken so that no more requests can be made using that 
    })
    await req.user.save() // saved the updated user

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/signup', cors(), async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound) {
            console.log(userFound);
            return res.status(400).send('Email already registered');
        }
        
        const user = new User(req.body);
        await user.save(); 
        console.log('signup successful');
        res.json({email: user.email});
    } catch (e) {
        console.log('sign up failure');
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;