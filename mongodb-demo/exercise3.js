
const mongoose = require('mongoose')
mongoose.connect( "mongodb://localhost/mongo-exercises")  //connection string. return promise
                                                //. In real world application we use environemnt varaiale . Not harcoded
 .then(()=>console.log("Connected to database"))
 .catch(err => console.error("Couldn't connect to MongoDb" , err.message))

 const Schema =  new mongoose.Schema({
    name:String ,
     date : Date ,
     author:String, 
     isPublished:Boolean ,
     tags : [String] ,
      price : Number 
    })
//const mySchema = new mongoose.Schema(Schema , {collection : "courses"})
const Course = mongoose.model('Course', Schema);   
//const Course = mongoose.model('Course',mySchema);

   // collection name
console.log(Course)
async function getCourse(){
const course = await Course.find({isPublished : true})
                            .or([{name: /.*by.*/}, {price:{$gte :15}} ])
                            .sort('-price')
                            .select("name price")
                            
    console.log(course) 
    
    
}

getCourse()

async function createCourse(){
    const course = new Course({    // if we keep it outside sysnc function it cause duplicate documents
        name : "Fcuntional Programming",
        date : "2018-01-24T21:56:15.353Z" ,
        author : 'Bianca Gondolfe',
        tags : [ "JS","FP"],
        isPublished : true,
        price : 20
    })
    const result = await course.save() // here we deal with async operation
    console.log(result)
}
//createCourse()


             