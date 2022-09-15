// to import emitter module
const EventEmitter = require('events')   //EventEmitter class

//create instance of that class
const emitter = new EventEmitter()



// in this we basically log message by using remote login services..
url = "www.neduet.edu.pk";     //url where we need to send http request
var log = function (msg) {        //log function for this prpse
    console.log(msg);
    
    //raise an event that messhage has been logged..
   // emitter.emit('messagedLogged',{id : 1908 , url : "http://neduet.edu.pk"})  //passing eventArg obj

}
module.exports = log;     //export log function so that it could be use by other modules 
//we dont need to export ulr bcz its purely implementation detail..
//we just export log() bcz it act as a button to access inner implementation detail
//we can export obj or single function

// to export single function
//module.exports = log


//console.log(module) 


