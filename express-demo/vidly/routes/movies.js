// import express for RESTful service
const express = require('express');
const { Genere } = require('../models/genere');
const router = express.Router();

const auth = require('../middleware/auth')

const {Movie , validate} = require('../models/movies')


router.get('/' ,async  ( req , res ) => {
    const movies = await Movie.find()

    if(movies.length == 0) return res.status(404).send("Movies not found")

    res.send(movies)
})

router.get('/:id' , async (req , res ) => {
    const movie = await Movie.findById(req.params.id)

    if(!movie )return res.status(404).send("No such movie found!")

    res.send(movie)

})

router.post( '/' , auth ,async ( req , res ) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genere = await Genere.findById(req.body.genereId)
    console.log(genere)

    if (!genere) return res.status(404).send("No such genere found!")

    const movie = await new Movie({
        title : req.body.title , 
        genere : {
            _id : genere._id , 
            title : genere.title
        } ,
        noOfStock : req.body.noOfStock ,
        dailyRentalRate : req.body.dailyRentalRate
    })
    try{
        const newMovie = await movie.save()
        res.send(newMovie)
    }
    catch(err) {
        console.log(err.message)
    }
})

router.put( '/:id' ,auth , async ( req , res ) => {
    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    try
    {
        const genere = await Genere.findById(req.body.genereId)
        if (!genere) return res.status(404).send("No such genere found!")

        const movie = await Movie.findByIdAndUpdate(req.params.id , {
            $set:{
                title : req.body.title , 
                genere : {
                    _id : genere._id ,
                    title : genere.title
                } ,
                noOfStock : req.body.noOfStock , 
                dailyRentalRate  : req.body.dailyRentalRate
            }
        } , {new : true})

        if(!movie) return res.status(404).send("No such movie found!")
        res.send(movie)
    }
    catch(err){
        res.send(err.message)
    }
    res.end()
   
})

router.delete( '/:id' , auth ,async ( req , res ) => {
    
    const movie = await Movie.findById(req.params.id)
    console.log(movie)

    if(!movie )return res.status(404).send("No such movie found!")

    await movie.deleteOne({_id : req.params.id})
    res.end()
})

module.exports = router