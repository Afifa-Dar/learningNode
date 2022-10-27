const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = (req , res , next) => {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access Denied!!')

    try{
        const decoded = jwt.verify(token, config.get("secretKey"))  // return payload
        req.user = decoded ;  // axcess by req.user._id in body
        next()

    }
    catch(ex){
        res.status(400).send("Invalid Token..")
    }
}