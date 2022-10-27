const express = require('express')

const error = require('../middleware/error')
const genere = require('../routes/generes')
const costumer = require('../routes/costumer')
const movie = require('../routes/movies')
const rental = require('../routes/rental')
const user = require('../routes/user')
const auth = require('../routes/auth');


module.exports = function(app){

        // to read req body
    app.use(express.json())

        // different routes 
    app.use('/api/genere',genere)
    app.use('/api/costumer',costumer)
    app.use('/api/movie',movie)
    app.use('/api/rental',rental)
    app.use('/api/user', user)
    app.use('/api/auth', auth)

        // handle error
    app.use(error)

}