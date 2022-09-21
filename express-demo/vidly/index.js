// import express for RESTful service
const express = require('express');
const app = express();
const genere = require('./routes/generes')
const port = process.env.PORT || 3000
// to read req body
app.use(express.json())
app.use('/api/genere',genere)

// listen
app.listen(port , () => console.log( `listen to port ${port}...`))