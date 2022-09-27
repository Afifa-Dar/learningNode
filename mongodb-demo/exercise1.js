
const mongoose = require('mongoose')
mongoose.connect( "mongodb://localhost/mongo-exercises")  //connection string. return promise
                                                //. In real world application we use environemnt varaiale . Not harcoded
 .then(()=>console.log("Connected to database")) 
 .catch(err => console.error("Couldn't connect to MongoDb" , err.message))

 const Schema = mongoose.Schema
const Course = mongoose.model('Course', new Schema({ }), 'courses');   
   // collection name

async function getCourse(){
    const course = await Course.find({ isPublished: true, tags: 'backend' }).sort({name : 1}).select({name : 1 , author : 1})
    console.log(course)
    
    
}

getCourse()