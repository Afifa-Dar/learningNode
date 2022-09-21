    //get config setting
//import config module
const config = require('config')
// get name proper of config 
console.log(`Name : ${config.get('name')}`)
console.log(`Mail Host : ${config.get('mail.host')}`)
console.log(`Mail Pass : ${config.get('mail.password')}`)

