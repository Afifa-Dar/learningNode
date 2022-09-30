// import express for RESTful service
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

// import Joi to facilitate validation..
const Joi = require('joi');


const Costumer = mongoose.model("Costumer" , new mongoose.Schema({
    name :{
        type : String , 
        minlength : 10 , 
        maxlength : 50 , 
        match : /^[a-zA-z ]+$/i,
        trim : true , 
    } 
}))

// get all costumer...
router.get('/' , async (req , res ) => {
    const listOfCostumer = await Costumer.find()
    if (listOfCostumer.length == 0) return res.status(404).send("Not Found Any Costumer..")
    for( i of listOfCostumer) res.write(`<h1>${i.name} </h1>`)
    res.end()
 })

 // get specific customer..

router.get('/:id' , async ( req , res ) => {
    const requiredCostumer = await  Costumer.findById(req.params.id)
    if (!requiredCostumer) return res.status(404).send("No such Costumer Found..")

    res.send(requiredCostumer)

})

 // add new costumer...
 router.post('/' , async (req , res ) => {

    const newCostumer = new Costumer({
        name : req.body.name
    })
    let {error} = validateName(newCostumer.name)

    if(error) return res.status(400).send(error.details[0].message)

    const result = await newCostumer.save()
    res.send(result)
 })

 // update Costumer

 router.put('/:id' , async (req , res ) => {
    const updateCostumer = await  Costumer.findById(req.params.id)
    if (!updateCostumer) return res.status(404).send("No such Costumer Found..")

    let {error} = validateName(req.body.name)
    if(error) return res.status(400).send(error.details[0].message)

    await Costumer.update({_id : req.params.id} , {

        $set : {
            name : req.body.name
        }
    })
    res.end()
 })

 // delete costumer...
router.delete('/:id' , async (req , res ) => {
    const deleteCostumer = await  Costumer.findById(req.params.id)
    if (!deleteCostumer) return res.status(404).send("No such Costumer Found..")

    await Costumer.deleteOne({_id : req.params.id})

    res.end()

   
})

 const validateName = name => {
    const schema = 
        Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required().min(10).max(50)   //only those req params are allowed that are declare in schema

    return schema.validate(name)
}

 module.exports = router