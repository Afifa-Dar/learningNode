//A template engine enables you to use static template files in your application. At runtime, 
//the template engine replaces variables in a template file with actual values, 
//and transforms the template into an HTML file sent to the client.
//This approach makes it easier to design an HTML page.

const { append } = require("express/lib/response");

//Some popular template engines that work with Express are Pug, Mustache, and EJS. 
//The Express application generator uses Jade as its default, but it also supports several others.
 
const express = require('express')
const app = express()

app.set('view engine' , 'pug')   //set template engine
app.set('views','./templates')  //set path where templates store (optional)

app.get('/' , ( req , res ) => {
    res.render('index' , { title : 'My Template' , message : 'Hello '})

})

app.listen(3000 , () => console.log('listening...'))