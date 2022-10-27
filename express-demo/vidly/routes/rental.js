const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Fawn = require('fawn');

const auth = require('../middleware/auth')

Fawn.init("mongodb://localhost/vidly")

const { Costumer }  = require('../models/costumers')
const { Movie }  = require('../models/movies')
const { Rental , validate } = require('../models/rental')


router.get('/' , async (req ,res ) => {
    const LIstOfRental = await Rental.find() ;

    if(LIstOfRental.length == 0) return res.status(404).send('No Rental found!') ;

    res.send(LIstOfRental)

})

router.get( '/:id', async (req , res ) => {
    const rental = await Rental.findById(req.params.id)

    if(!rental) return res.status(404).send('rental not found!') ;

    res.send(rental)
})

router.post( '/' , auth , async (req , res ) => {

    const {error} = validate(req.body) ;

    if (error) return res.status(400).send( error.details[0].message) ;

    const costumer = await Costumer.findById(req.body.costumerId)
    if(!costumer) return res.status(404).send('costumer not found!') ;

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(404).send('Movie not found!') ;

    if(movie.noOfStock === 0) return res.status(404).send('Movie is out of stock..')

    const newRental = await new Rental({
        costumers : {
            _id : costumer._id ,
            name : costumer.name , 
            isGold : costumer.isGold ,
            phone : costumer.phone
        } , 
        movies :
        {
            _id : movie._id ,
            title : movie.title ,
            dailyRentalRate : movie.dailyRentalRate
        } 
    })

    // movie.noOfStock-=1
    // await movie.save()

    // await newRental.save()

    // create a task called transaction 
try{

    new Fawn.Task()
        // write operations... All of them are treated as a unit
        .save('rentals' , newRental)   // collectionName , object 
        .updateOne('movies' , {_id : movie._id} ,{  // update object
            $inc : {noOfStock : -1}   // -1 for decrement
        })
        .run()   // after all operations to run these operations

    res.send(newRental)
}
catch(err){
    res.status(500).send(err.message)
}
})



router.put( '/:id' , auth , async (req , res ) => {

    const {error} = validate(req.body) ;
    if (error) return res.status(400).send( error.details[0].message) ;
try {
    const costumer = await Costumer.findById(req.body.costumerId)
    if(!costumer) return res.status(404).send('costumer not found!') ;

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(404).send('Movie not found!') ;

    const updateRental = await Rental.findByIdAndUpdate(req.params.id ,{
        $set : {
            costumers : {
                _id : costumer._id ,
                name : costumer.name , 
                isGold : costumer.isGold ,
                phone : costumer.phone
            } , 
            movies :
            {
                _id : movie._id ,
                title : movie.title ,
                dailyRentalRate : movie.dailyRentalRate
            } 
        }
    }, { new : true})

    if(!updateRental) return res.status(404).send('No such Rental found!') ;

    res.send(updateRental)

}
    catch(err) {
        res.send(err.message)
    }
})

router.delete( '/:id' , auth ,async (req , res ) => {
    try{
        const deleteObj = await Rental.findByIdAndDelete(req.params.id)

        if(!deleteObj) return res.status(404).send('No such Rental found!') ;

    }
    catch(err){
        res.send(err.message)
    }
    res.end()
})


module.exports = router