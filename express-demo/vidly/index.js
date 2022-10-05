// import express for RESTful service
const express = require('express');
const mongoose = require('mongoose')


const app = express();
const genere = require('./routes/generes')
const costumer = require('./routes/costumer')
const movie = require('./routes/movies')

mongoose.connect("mongodb://localhost/vidly")  //connection string. return promise
  //. In real world application we use environemnt varaiale . Not harcoded
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Couldn't connect to MongoDb", err.message))



const port = process.env.PORT || 5000

// to read req body
app.use(express.json())
app.use('/api/genere',genere)
app.use('/api/costumer',costumer)
app.use('/api/movie',movie)



// listen
app.listen(port , () => console.log( `listen to port ${port}...`))