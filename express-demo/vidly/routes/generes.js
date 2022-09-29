// import express for RESTful service
const express = require('express');
const router = express.Router();

// import Joi to facilitate validation..
const Joi = require('joi');

// import database API
const genereDatabase = require('./database')
const Genere = genereDatabase.Genere
const create = genereDatabase.create
const save = genereDatabase.save
const update = genereDatabase.update
const del = genereDatabase.delete



// get all genere
router.get('/' , async (req , res ) => {
   const listOfGenere = await Genere.find()
   for( i of listOfGenere) {
    res.write(`<h1>${i.id.toString()} </h1>`)
    res.write(`${i.title}`)
   }
   res.end()
})


// get specific genere
router.get('/:id' , async (req , res ) => {
   // look for genere
   const genere = await Genere.find({id : req.params.id})

   //if no genere found
   if(genere.length == 0) return res.status(404).send("No such genere found")

   //else 
   res.send(genere)
})

// create new genere 
router.post('/', async (req , res ) => {

    // create genere
    const newGenere = await create(req.body.title)

    //validat genere 
    let {error} = validateTitle(newGenere.title)

    if(error) return res.status(400).send(error.details[0].message)

    //save genere
    save(newGenere)
    res.send(newGenere)
})

// update genere

router.put('/:id' , async ( req , res ) => {

    // look for genere
    const genere = await Genere.find({id : req.params.id})

    //if no genere found
    if(genere.length == 0) return res.status(404).send("No such genere found")
 
   //else , validate updated value
    let {error} = validateTitle(req.body.title);

    if(error) return res.status(400).send(error.details[0].message)

    //update genere
   update(req.params.id , req.body.title);

   // end res
   res.end()
})

//delete specific genere
router.delete('/:id' , async ( req , res ) => {

   // look for genere
   const genere = await Genere.find({id : req.params.id})

   //if no genere found
   if(genere.length == 0) return res.status(404).send("No such genere found")

   //else delete specific genere
   del(req.params.id)
   // end res
   res.end()

})


const validateTitle = genere => {
    const schema = 
        Joi.string().pattern(new RegExp('^[a-zA-Z]{5,10}$')).required()   //only those req params are allowed that are declare in schema

    return schema.validate(genere)
}


module.exports = router