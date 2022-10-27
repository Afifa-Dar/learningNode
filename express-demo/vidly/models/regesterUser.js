const mongoose = require('mongoose')

// import Joi to facilitate validation..
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const jwt = require('jsonwebtoken');
const config = require('config')

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true ,
        required : true ,
        minlength : 10 , 
        maxlength : 50 , 
        match : /^[a-zA-z ]+$/i
    } ,
    email : {
        type : String ,
        unique : true ,
        lowercase : true ,
        required:true ,
       // match : /^[a-z]+[0-9]+@gmail.com$/
    } ,
    password : {
        type : String ,
        required : true ,
        minlength : 8 
    } ,
    isAdmin : Boolean
})
userSchema.methods.getAuthToken = function(){
   return jwt.sign({_id : this._id , isAdmin:this.isAdmin} , config.get("secretKey"))

}

const Users = mongoose.model("users" , userSchema)

const validateUser = user => {
    const schema = Joi.object({
        name : Joi.string().required().pattern(new RegExp('^[a-zA-Z ]+$')).required().min(10).max(50) ,
        email : Joi.string().required().email() , //pattern(new RegExp('^[a-z]+[0-9]+@gmail.com$')) ,
        password : passwordComplexity()
    })
    
    return schema.validate(user)
}

exports.User = Users ;
exports.validate = validateUser ;