const mongoose = require('mongoose')
const winston = require('winston')
const config = require('config')

module.exports = function(){
    const db = config.get("db")
    new mongoose.connect(db ,{useUnifiedTopology: true ,useNewUrlParser: true})  //connection string. return promise
    //. In real world application we use environemnt varaiale . Not harcoded
    .then(() => winston.info(`Connected to ${db}`))
}