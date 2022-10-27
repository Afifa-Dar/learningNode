const config = require('config')

module.exports = function(){
    if(!config.get("secretKey"))
        throw new Error("FATAL ERROR : secret key is not defined..")
}
