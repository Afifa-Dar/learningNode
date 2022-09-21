const authentication =( req , res , next ) => {   
    console.log('authenticating...');               //middleware function run in a seq in which they code
    next()     
}

module.exports = authentication