// import express for RESTful service
const { json } = require('express');
const express = require('express');
const app = express();

// import Joi to facilitate validation..
const Joi = require('joi');

// to read req body
app.use(express.json())



// create enviroment variable for PORT
const port = process.env.PORT || 3000;
const genere = [
    {
        id : "1",
        title : "comedy"
    },
    {
        id : "2",
        title : "horror"
    },
    {
        id : "3",
        title : "drama"
    }
];

// get all genere
app.get('/api/genere' , (req , res ) => {
    for( let i of genere){
        res.write(`<h1>id : ${i.id}</h1>`);
        res.write(`title : ${i.title}` )
    }
    res.end()
})

// get specific genere
app.get('/api/genere/:id' , (req , res ) => {
   // look for genere
   let result = genere.find( g => req.params.id === g.id);
   //if no genere found
   if(!result) return res.status(404).send("No such genere found")
   //else 
   res.send(result)
})

// create new genere 
app.post('/api/genere', (req , res ) => {
    const inputGenere ={
        id : ((genere.length)+1).toString(),
        title : req.body.title
    }
    //validate title 
    let {error} = validateTitle(req.body)

    if(error) return res.status(400).send(error.details[0].message)
    genere.push(inputGenere)
    res.send(inputGenere)
})

// update genere
app.put('/api/genere/:id' , ( req , res ) => {
    // look for genere
   let result = genere.find( g => req.params.id === g.id);
   //if no genere found
   if(!result) return res.status(404).send("No such genere found")

   //else validate updated value
    let {error} = validateTitle(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    //else
   result.title = req.body;
   res.send(result)
})

//delete specific genere
app.delete('/api/genere/:id' , ( req , res ) => {
   // look for genere
   let result = genere.find( g => req.params.id === g.id);
   //if no genere found
   if(!result) return res.status(404).send("No such genere found")

   //else delete specific genere
   let index = genere.indexOf(result);
   genere.splice(index , 1)

   // end res
   res.end()

})

const validateTitle = genere => {
    const schema = Joi.object({
        title : Joi.string().pattern(new RegExp('^[a-zA-Z]{5,10}$'))   //only those req params are allowed that are declare in schema
    })
    return schema.validate(genere)
}

// listen
app.listen(port , () => console.log( `listen to port ${port}...`))