const winston = require('winston')

module.exports = function(err , req , res , next){
  //winston.log('error' , err.message)
  winston.error(err.message, err)
    //winston.error(err.message , err)   // msg , meta data 
    res.status(500).send("something failed..plz try again later")
  }

// wiston login level
// 1- error
// 2- warn
// 3- info
// 4- verbose
// 5- debug
// 6- silly