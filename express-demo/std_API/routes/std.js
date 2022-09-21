const express = require('express')
const router = express.Router()
const Joi = require('joi')
const std = [
    {
        id : "1",
        name : "Ali"
    },
    {
        id : "2",
        name : "saba"
    },
    {
        id : "3",
        name : "sana"
    }
];

// get all std
router.get('/' , (req , res ) => {
    for( let i of std){
        res.write(`<h1>id : ${i.id}</h1>`);
        res.write(`name : ${i.name}` )
    }
    res.end()
})

// get specific std
router.get('/:id' , (req , res ) => {
   // look for std
   let result = std.find( s => req.params.id === s.id);
   //if no std found
   if(!result) return res.status(404).send("No such std found")
   //else 
   res.send(result)
})

// create new std 
router.post('/', (req , res ) => {
    const inputStd ={
        id : ((std.length)+1).toString(),
        name : req.body.name
    }
    //validate name 
    let {error} = validatename(req.body)

    if(error) return res.status(400).send(error.details[0].message)
    std.push(inputStd)
    res.send(inputStd)
})

// update name
router.put('/:id' , ( req , res ) => {
    // look for name
   let result = std.find( g => req.params.id === g.id);
   //if no std found
   if(!result) return res.status(404).send("No such std found")

   //else validate updated value
    let {error} = validatename(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    //else
   result.name = req.body;
   res.send(result)
})

//delete specific std
router.delete('/:id' , ( req , res ) => {
   // look for std
   let result = std.find( g => req.params.id === g.id);
   //if no std found
   if(!result) return res.status(404).send("No such std found")

   //else delete specific std
   let index = std.indexOf(result);
   std.splice(index , 1)

   // end res
   res.end()

})

const validatename = std => {
    const schema = Joi.object({
        name : Joi.string().pattern(new RegExp('^[a-zA-Z]{5,10}$'))   //only those req params are allowed that are declare in schema
    })
    return schema.validate(std)
}

module.exports = router