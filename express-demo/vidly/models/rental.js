const mongoose = require('mongoose') ;
const Joi = require('joi') ;


const Rental = mongoose.model("Rental" , new mongoose.Schema({
    costumers : {
        type : new mongoose.Schema({
            name :{
                type : String , 
                minlength : 10 , 
                maxlength : 50 , 
                match : /^[a-zA-z ]+$/i,
                trim : true ,
                required : true
            } ,
            isGold :{ 
                type : Boolean , 
                default : false
            },
            phone : {
                type : String ,
                match : /^021-[0-9]{9}$/,
                required : true
            }
        }) ,
        required : true
    } ,

    movies : {
        type : new mongoose.Schema({
            title : {
                type : String ,
                required : true , 
                min : 5 , 
                max : 50 , 
                trim : true
            } ,
            dailyRentalRate :{
                type : Number , 
                min : 0 ,
                max : 5 
            }
        }) ,
        required : true 
    } ,

    dateOut : {
        type : Date ,
        default : Date.now
    } ,

    dateReturned : {
        type : Date
    } ,

    rentalFee : {
        type : Number ,
        min : 0
    } ,



}));

const validateRental = rental => {
    const schema = Joi.object({
        costumerId : Joi.objectId().required() ,
        movieId : Joi.objectId().required()
    })
    return schema.validate(rental)
}



exports.Rental = Rental ; 
exports.validate = validateRental ;