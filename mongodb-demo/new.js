
const mongoose = require('mongoose')

const connection = mongoose.createConnection( "mongodb://localhost/mongo-exercises");
const Course = connection.model('Course', new mongoose.Schema({},{collection : "coures"}));
async function getCourse(){
    const course = await Course.find({name : /.*by.*/i , price :{$gte : 15}})
        console.log(course)
        
        
    }
    
    getCourse()