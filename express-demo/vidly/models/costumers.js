const mongoose = require('mongoose')
const Joi = require('joi')


const Costumer = mongoose.model("Costumer" , new mongoose.Schema({
    name :{
        type : String , 
        minlength : 10 , 
        maxlength : 50 , 
        match : /^[a-zA-z ]+$/i,
        trim : true ,
        required : true
    } ,
    isGold : {
        type :Boolean , 
        default : false
    } ,
    phone : {
        type : String ,
        match : /^021-[0-9]{9}$/,
        required : true
    }
}))


const validateCostumer = costumer => {
    const schema = Joi.object({
        name :  Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required().min(10).max(50) ,  //only those req params are allowed that are declare in schema
        isGold : Joi.boolean(),
        phone : Joi.string().pattern(new RegExp('^021-[0-9]{9}$')).required()
    })

    return schema.validate(costumer)
}

exports.validate = validateCostumer
exports.Costumer = Costumer
