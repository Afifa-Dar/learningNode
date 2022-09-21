const express = require('express')
const router = express.Router()

router.get('/' , ( req , res ) => {
    res.render('index' , { title : 'My Template' , message : 'Hello '})

})

module.exports = router