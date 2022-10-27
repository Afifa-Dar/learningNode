// import express for RESTful service
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrpyt = require('bcrypt');

// import Joi to facilitate validation..
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");


const {User} = require('../models/regesterUser');
const { invalid } = require('joi');


router.post( '/' , async ( req , res ) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send(`invalid email or password..`)  // incase of email not found..

    const isValid =  await bcrpyt.compare(req.body.password , user.password)   // validate userS
   
    if(!isValid) return res.status(400).send(`invalid email or password..`)   // incase of incorrect passwordS
    const token = user.getAuthToken()
    res.send(token)
})




const validate = user => {
    const schema = Joi.object({
        email : Joi.string().required().email() , //pattern(new RegExp('^[a-z]+[0-9]+@gmail.com$')) ,
        password : passwordComplexity()
    })
    
    return schema.validate(user)
}
module.exports = router
