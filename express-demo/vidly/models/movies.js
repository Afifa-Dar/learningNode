const mongoose = require('mongoose')
const Joi = require('joi')

const {genereSchema} = require('./genere')


const Movies = mongoose.model("movies" , new mongoose.Schema({
    title : {
        type : String ,
        required : true , 
        min : 5 , 
        max : 50 , 
        trim : true
    } ,
    genere :{
        type : genereSchema ,
        required : true
    } , 
    noOfStock : {
        type : Number ,
        min : 0 , 
        max : 20 
    } , 
    dailyRentalRate :{
        type : Number , 
        min : 0 ,
        max : 5 
    }
}))

const validateMovies = movie => {  // joi schema whats client sends us
    const schema = Joi.object({
        title : Joi.string().required().min(5).max(50).pattern(new RegExp('^[a-zA-Z ]+$')) ,
        genereId : Joi.objectId().required(),
        noOfStock : Joi.number().min(1).max(20) ,
        dailyRentalRate : Joi.number().min(0).max(5)
    })
    return schema.validate(movie)

}

exports.Movie = Movies
exports.validate = validateMovies

