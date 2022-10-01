// import express for RESTful service
const express = require('express');
const router = express.Router();


const {Costumer , validate} = require('../models/costumers')

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

    let {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const newCostumer = new Costumer({
        name : req.body.name ,
        isGold : req.body.isGold ,
        phone : req.body.phone
    })

    const result = await newCostumer.save()
    res.send(result)
 })

 // update Costumer

 router.put('/:id' , async (req , res ) => {
    const updateCostumer = await  Costumer.findById(req.params.id)
    if (!updateCostumer) return res.status(404).send("No such Costumer Found..")

    let {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    await Costumer.update({_id : req.params.id} , {

        $set : {
            name : req.body.name ,
            isGold : req.body.isGold ,
            phone : req.body.phone
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

 

 module.exports = router