const winston = require('winston')   // npm package that support log msgs .. its a storage device for log msgs 
                                    // comes with one transport that is login msgs in console..
                                    // Can logon msgs in file , http , console , mongodb ,...
require('winston-mongodb')
require('express-async-errors')

// add new transport to winston.
module.exports = function(){

    // winston.rejections.handle(
    //   new winston.transports.File({ filename: 'rejections.log' })
    // );
    
    winston.exceptions.handle(
        new winston.transports.File({filename : "exceptions.log"}) 
    )
         
    winston.add(
        new winston.transports.File( {filename : "logFile.log" })
        )

    winston.add(
        new winston.transports.MongoDB( {db : "mongodb://localhost/vidly" , level : "error"})
    )
    
    
    // process.on('uncaughtException' , ex => {
    //   winston.error(ex.message , ex)
    //   process.exit(1)
    // })
    // process.on('unhandledRejection' , ex => {
//   throw ex
//  })
}


