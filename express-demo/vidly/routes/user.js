// import express for RESTful service
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrpyt = require('bcrypt');

const {User , validate} = require('../models/regesterUser')


router.post( '/' , async ( req , res ) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    if(await User.findOne({email:req.body.email})) return res.status(400).send(`user already regester by ${req.body.email}`)

    const newUser = new User( _.pick(req.body ,["name" , "email" ,'password'])
    //     {
    //     name : req.body.name ,
    //     email : req.body.email ,
    //     password : req.body.password
    // }
    )

    const salt = await bcrpyt.genSalt(10) //set of 10 random string
    newUser.password = await  bcrpyt.hash(newUser.password,salt)   
   
    try{
        await newUser.save()
        const token = newUser.getAuthToken()
        res.header("x-auth-token" , token).send(_.pick(newUser , ["_id" , 'name' , "email"]))        
        //res.send(newUser)
    }
    catch(err) {
        res.send(err.message)
    }
})

module.exports = router
