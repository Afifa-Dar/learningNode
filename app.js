//import EventEmtitter class 
//const EventEmitter = require('events')
//import class logger from loggerApp
const Logger = require('./loggerApp');
console.log(Logger)

//create instance of class Logger in app.js
const logger = new Logger()
console.log(logger)
logger.on('messageLogged',(arg) => console.log(`message logged  by ${arg.id} through ${arg.url}`))

logger.log('message has been logged')


