
//console.log(__dirname , __filename)
// console.log(module)


// this is main module
//to import module we have require()

const logger = require("./looger")   // './' indicate that this module is in samen folder
//declare as const bcz we dont wanna chnge this

console.log(logger)    // returns object that export by looger module

logger("hello")    // call logMsg () from imported module

//path module
const path = require('path')
const pathObj = path.parse(__filename)   //has info about path.While dealing with path its better to use pathModule
console.log(`parseObj : ${pathObj}`)
for (i in pathObj) console.log(`${i}:  ${pathObj[i]}`)

//OS module
const os = require('os')
console.log(` free memory: ${os.freemem()}`);  //get info about free available memory in machine
console.log(` total memory: ${os.totalmem()}`);  //get info about total memory in machine

// before node we couldn't do this with javascript


//fileSystem
const fs = require('fs');
const files = fs.readdirSync('./')  //get files name in a current directory
//using sync method
console.log(files)

//using async method
//async get callback as an argument.
//callback has two argument 1- error (for error handling) 2- files (which is an array)
 
fs.readdir('.nodejs',function(err , file){
    if(err) console.log("error! "+err);    
    else console.log(`file: ${file}`)
})  

//event module
//when there is a HTTP request node raises  different type of events to handle this request
//one most imp and core class in event is EventEmitter.
//most event classes are based on this

const EventEmitter = require('events')   //EventEmitter class

//create instance of that class
const emitter = new EventEmitter()

//calling method to object

                // register a listener
 
//order matter a lot here
//if we register it after an event raised , nothing happen
//becz when an event raised emitter iterates over all regestered events and call them SYNCHRONOUSLy

//regester logging event
emitter.on('logging', msg => console.log(msg))  //log a msg that is pased as an arg

emitter.addListener('messageLogged', () => {
    emitter.emit('logging','logged')     //raised before remoted Server logged a msg

    console.log('Message has been logged')
})


emitter.on('reqPop',() => {     //on is an alias of addListener
    console.log('Request hasbeen pop')
})                                         

//Raise an event
emitter.emit('messageLogged')  //use to raise an event
//here we pass an event that is raised
//emit mean making a noise , or something ... 
//here we making a noise to an event signalling that event is happening


//when event raised there is addlistener method to listen this event.. listner called when event raised
//with regester any listner if we just raised event nothing happen



//passing event arguments

//listener 
emitter.on('login',(arg) => console.log(`login by ${arg.id} through ${url}`))

//raise an event
emitter.emit('login',{id : 1908 , url : "http://neduet.edu.pk"})  //passing eventArg obj


// it rare to use emitter object directly


         //http module
//use for creating networking application
//there are bunch of classes have bunch of properties and methos..

//import httmp module..

const http = require('http');
console.log(http)

//create server

//const server = http.createServer()


//server is an eventemiter having all capabilites of EventEmitter

// on every connection there is an event raised by server

// server.on('connection',() => {
//     console.log('New Connection')    // in real world we didn't do anything in response to connection event to build http service....
//                                     // instead we pass a callback function in createServer()
// })
const server = http.createServer( (req , res ) => {
    // in this fucniton we work with actual request instead of socket..
    if(req.url === "/"){
        res.write("Wlcome");    //if user req (accessed) on this url give client this response
        res.end();
    }
    // in mobile/web application we have to handle different routes..
    // for this we hae if block
     if(req.url === '/api/courses'){
        res.write(JSON.stringify(["AI","DataScience",'MetaVerse']));
        res.end()
     }

     // in real world we dont use http module to built backend service..
     // as soon as routes increaes code become complex..
     // bcz we have to handle everyone in a linear way inside callback..
     // inside we use framework Express to handle multiple routes....

  })
   
server.listen(3000);
console.log('server listen at port 3000')

