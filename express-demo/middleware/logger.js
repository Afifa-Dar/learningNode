function log( req , res , next ){   //nest refer to next middleware function
    console.log('logging...');
    next()     //use to parse control to nest middleware function..
//if its not use req stuck in response cycle
}

module.exports = log

