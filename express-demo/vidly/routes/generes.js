// import express for RESTful service
const express = require('express');
const router = express.Router();

const {Genere , validate} = require('../models/genere')

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
    const genere = new Genere({
        title : req.body.title , 
        id : (await Genere.find().count())+1
     })

    //validat genere 
    let {error} = validate(genere.title)

    if(error) return res.status(400).send(error.details[0].message)

    //save genere
    await genere.save()
    res.send(genere)
})

// update genere

router.put('/:id' , async ( req , res ) => {

    // look for genere
    const genere = await Genere.find({id : req.params.id})

    //if no genere found
    if(genere.length == 0) return res.status(404).send("No such genere found")
 
   //else , validate updated value
    let {error} = validate(req.body.title);

    if(error) return res.status(400).send(error.details[0].message)

    //update genere
   await Genere.update({id : req.params.id } , {   // 1st arg->filter object , 2nd arg -> update object
        // use updates operators..
    $set : {
        title : req.body.title
      }
    })
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
   await Genere.deleteOne({ id: req.params.id })
   // end res
   res.end()

})

module.exports = router