const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/database')()
require('./startup/config')()
require('./startup/validation')

//throw new Error("failed something")
//Promise.reject(new Error('failed to fulfil promise..')).then( () => console.log("done.."))


const port = process.env.PORT || 5000
const server = app.listen(port , () => winston.info( `listen to port ${port}...`))

module.exports = server