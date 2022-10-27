// import express for RESTful service
const express = require('express');
const router = express.Router();

const validateObjId = require('../middleware/validateObjId')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
//const asyncMiddleware = require('../middleware/async')

const {Genere , validate} = require('../models/genere');

// get all genere
router.get('/' , async (req , res ) => {
    
    const listOfGenere = await Genere.find()
    res.send(listOfGenere)

})


// get specific genere
router.get('/:id' , validateObjId ,async (req , res ) => {

   // look for genere
   const genere = await Genere.find({_id : req.params.id})
   //if no genere found
   if(genere.length == 0) return res.status(404).send("No such genere found")

   //else 
   res.send(genere)
})

// create new genere 
router.post('/', auth ,async (req , res ) => {

    // create genere
    const genere = new Genere({
        title : req.body.title 
     })

    //validat genere 
    let {error} = validate(genere.title)

    if(error) return res.status(400).send(error.details[0].message)

    //save genere
    await genere.save()
    res.send(genere)
})

// update genere

router.put('/:id' , auth , async ( req , res ) => {

    // look for genere
    const genere = await Genere.find({_id : req.params.id})

    //if no genere found
    if(genere.length == 0) return res.status(404).send("No such genere found")
 
   //else , validate updated value
    let {error} = validate(req.body.title);

    if(error) return res.status(400).send(error.details[0].message)

    //update genere
   await Genere.updateOne({_id : req.params.id } , {   // 1st arg->filter object , 2nd arg -> update object
        // use updates operators..
    $set : {
        title : req.body.title
      }
    })
   // end res
   res.end()
})

//delete specific genere
router.delete('/:id' , [auth , admin] , async ( req , res ) => {

   // look for genere
   const genere = await Genere.find({_id : req.params.id})

   //if no genere found
   if(genere.length == 0) return res.status(404).send("No such genere found")

   //else delete specific genere
   await Genere.deleteOne({ _id: req.params.id })
   // end res
   res.end()

})

module.exports = router