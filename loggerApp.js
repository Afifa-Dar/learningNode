const EventEmitter = require('events')

//create a Looger class having functionalities of EventEmitter + additional functionalities

class Logger extends EventEmitter {   //Logger extends to EventEmitter so that it inherit its characteristics
   
    //define method log in class

    log(msg) {        //log function for this prpse
        console.log(msg);
        
        //raise an event that messhage has been logged..
        this.emit('messageLogged',{id : 1908 , url : "http://neduet.edu.pk"})  //passing eventArg obj
          //this refer the instance of this class
    }
}


module.exports = Logger;   