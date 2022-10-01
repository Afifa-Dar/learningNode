const mongoose = require('mongoose')

// import Joi to facilitate validation..
const Joi = require('joi');


const Genere = mongoose.model("Genere" , new mongoose.Schema({
    id : Number ,
    title :{
        type : String , 
        minlength : 5 , 
        maxlength : 10 , 
        match : /^[a-zA-z]+$/i,
        trim : true , 
        uppercase : true
    } 
}))

const validateTitle = genere => {
    const schema = 
        Joi.string().pattern(new RegExp('^[a-zA-Z]{5,10}$')).required()   //only those req params are allowed that are declare in schema

    return schema.validate(genere)
}

exports.Genere = Genere;
exports.validate = validateTitle;