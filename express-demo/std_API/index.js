const express = require('express')
const app = express()   // returns an object having bunch of useful methods..
const Joi = require('joi');
const logger = require('../middleware/logger')
const authenticating = require('../middleware/authenticating')
const helmet = require("helmet");
const morgan = require('morgan');
const config = require('config')
const std = require('./routes/std')
const home = require('./routes/home')

app.use(express.json())
app.use(express.urlencoded({extended : true}))   
app.use(express.static('public'))   // use to handle static files.. gte name of filder to read static files
app.use(helmet())
app.use(logger)
app.use(authenticating)

app.set('view engine' , 'pug')   //set template engine
app.set('views','../templates')  //set path where templates store (optional)

//if we want to log msg only on development environment
if(app.get('env') === 'development')
    {
        app.use(morgan('tiny'))  
        console.log('morgan enabled')
    }
app.use('/',home)
app.use('/api/std' , std)


// get name proper of config 
console.log(` Mail Host : ${config.get('mail.host')}`)

// tmplate



      
app.listen(3000,() => console.log('listen to port 3000....'))

