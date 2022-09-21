//middleware of middleware function..
// take request obj from client and return reponse or passes control to other middleware..

//request handler is onenof the example of middleware function..
//another example is 
//append.use(express.json())
//express.json() return a  middleware function that look for json obj in req boby..
// if there any json obj in req body it parse it to json object called req.body..
// json() middle ware function not terminate the response , it pasrse control to another middleware function ie routerHandler()


const express = require('express')
const app = express()   // returns an object having bunch of useful methods..
const Joi = require('joi');
const logger = require('./logger')
const authenticating = require('./authenticating')

const std = [
    {
        id : "1",
        name : "Ali"
    },
    {
        id : "2",
        name : "saba"
    },
    {
        id : "3",
        name : "sana"
    }
];

    //builtin middleware fucntion
//json middleware function..

app.use(express.json())   //populate json object in req body to "req.body"


//urlencoded middleware function

//parses incoming req with url encoded payloads..

//not use now a days
// when we post in form body of req look like in key value pair
//key1 = value1 & key2 = value2

// for this we have urlencoded
app.use(express.urlencoded({extended : true}))   // we can also pass array and complex obbj through urlencoded


//static middleware function
app.use(express.static('public'))   // use to handle static files.. gte name of filder to read static files


    //3rd party middleware function

// 1st install and import 
const helmet = require("helmet");
const morgan = require('morgan');

//helmet middleware function.. use to secure apps by sending http header
app.use(helmet())

//morgan middleware fucntion...use to log HTTP request.. 

   //node environment..
    // We must to know about node environment
    // On the base of it we can enable or disable certain features..

    // For example we want to log in http request only on development environment

    // Development environment is building and running application in local machine
    // Production is the process of making application ready to deploy and consumed by users..
        
// We can get node current environment by
const pEnv = process.env.NODE_ENV;
        // node_env = node current environment
        // If not defined it return undefined
//another way 
const AppEnv = app.get('env')
        //if not set it will return development..

console.log( `Process : ${pEnv}     app: ${AppEnv}`)

    //get config setting
//import config module
const config = require('config')
// get name proper of config 
console.log(` Mail Host : ${config.get('mail.host')}`)
    //if we want to log msg only on development environment
if(app.get('env') === 'development')
    {
        app.use(morgan('tiny'))  // we can specify various formats.. here we specify tiny(enpoints,status,timeREqd)
    //custom middleware fucntion
// in custom middler funtion we perform a lot of fcuntions like logging authentication and so on..
        console.log('morgan enabled')
    }
//custom middleware function for logging...
app.use(logger)

//custom middleware function for authenticating...
app.use(authenticating)

//route handler middleware fucntion
app.get('/', (req, res) => {
    res.send(`<h1>Welcom to the  node!!</h1>`)
})

// create new genere 
app.post('/api/std', (req , res ) => {
    const inputStd ={
        id : ((std.length)+1).toString(),
        name : req.body.name
    }
    //validate name
    let {error} = validateName(req.body)

    if(error) return res.status(400).send(error.details[0].message)
    std.push(inputStd)
    res.send(inputStd)
})

const validateName = name => {
    const schema = Joi.object({
        name : Joi.string().required().pattern(new RegExp('^[a-zA-Z]{5,10}$'))  //only those req params are allowed that are declare in schema
    })
    return schema.validate(name)
}


      
app.listen(3000,() => console.log('listen to port 3000....'))

