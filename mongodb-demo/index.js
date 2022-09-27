// connect to mongoDB

const mongoose = require('mongoose')
mongoose.connect( "mongodb://localhost/playground")  //connection string. return promise
                                                //. In real world application we use environemnt varaiale . Not harcoded
 .then(()=>console.log("Connected to database")) 
 .catch(err => console.error("Couldn't connect to MongoDb" , err.message))

            // define schema....

 // we use schema to define the shape of documents in mongoDB collection
 // specifi to mongoose not part of mongoDb

// collection => tables (in relational database)
// documments => row   (in relational database)
// document is the container of key/val pair

// data typesof schema
// String , Number , Boolean , Array , Buffer (to store binary data) , ObjectId (uniquley identifier) , Date

// mongoose validation is use for database vlaidaiton whereas JOi validaiton is on client side

 const courseSchema = new mongoose.Schema({
    courseTitle : {type : String, required : true} ,  // this validation is a part of mongoose
    courseCode : String ,    // keys : value Type
     author : String,
     tags : [String],
     date : {type : Date , default : Date.now},
    isPublish : Boolean
 })

// // compile schema into model
const Course = mongoose.model("Course" , courseSchema)   // 1st arg => model name , 2nd arg => schema
 // Course => class its documents => instace of this class


//save documents in database
async function createCourse(){
    const course = new Course({    // if we keep it outside sysnc function it cause duplicate documents
        courseTitle : "Machine Learning",
        courseCode : "ML-785" ,
        author : 'Mufaddal Hatim',
        tags : [ "ML","dataSci"],
        isPublish : true
    })

    try{
     
      //  course.validate(// return a promise of void..
      //     err => {
      //       if(err) console.log("try again..")
      //     }
      // )  
      
      const result = await course.save() // here we deal with async operation
      console.log(result)
    }
    catch(err){
        console.log(err.message)
    }
}
createCourse()

// querying the courses
async function getCourse(){
    //const course = await Course.find()   // find all courses

    const firstTwoCourses = await Course.find().limit(2)  // get 1st two course.. we get this using  limit()
    console.log(firstTwoCourses)

    const lastTwoCourses = await Course.find().skip(1)      // get last two course.. we get this using  skip()
    console.log("Last two Courses",lastTwoCourses)

            // Pagination....
    const pageNumber = 3;     // in real world application it gts from queryString
    const pageSize = 5;
         // if we wana get documents only of a current page
         // we achieve this using limit() and skip()

    const doc = await Course.find().skip((pageNumber-1)*pageSize).limit(pageSize)
    console.log("Doc of current page" , doc)

    //const course = await Course.find({author : "Mosh Hamedani",isPublish : true})   // find specific courses.. by apply filters
    
    // const course = await Course.find({isPublish : true})  // costumize query
    //                             .select({courseCode : 1 , courseTitle : 1})  // 1 => select this 
    //                             .sort({courseTitle : 1})  //1=> ascending 2=> descending
    
    // query using comparison opertor....

    // eq(eaqual)   ne(not equal)   gt(greater then)    gte(gretaer then equal to)
    // lt(less then)    lte(less then equal to)     in      nin(not in)
    
    //const course = await Course.find({price :10})  //find course having price equal to 10

    //const course = await Course.find({price : {$gte :10 , $lte : 20}}) //price btw 10 and 20 . $ represent its operator

    //const course = await Course.find({price : { $in : [10,15,20]}}) //having price => 10,15 and 20

        // query using logical opertor....
    
    //const course = await Course.find().or([ {author : "Mosh Hamedani"} , {isPublish : true} ])

    //const course = await Course.find().and([ {author : "Mosh Hamedani"} , {isPublish : true} ])

               // query using regular expression....
    //const course = await Course.find({author : /^Mosh/i}); //author start with mosh
   // const course = await Course.find({author : /khan$/i}); //author ends with khan
    const course = await Course.find({author : /.*ahmed.*/i}); //author contains with ahmed
    console.log(course )

      // count no of documents 
    const publishCourses = await Course.find({isPublish:true}).count() // get count of publishCourses
     console.log(publishCourses)
}
//getCourse()

   // update course
   async function  updateCourse(id) {
    // Query First Approach...
  // useful when we need to take inpit from client..
  // when we want to make sure update valid rule ( mean define rule for updates)..

// const course = await Course.findById(id)    //get course
// if(!course) return                          // if no course found!
// // course.author = "New Author"                // else update course
// // course.price = 2

// //another approach
// course.set({
//   author : "Ali khan" , 
//   isPublished : true 
// })
// const result = await course.save()           // save update
// console.log(result)                          // print result (optional!)

    // Update First Approach...
  // when you want to update document or multiple document from directly to the database ..

  // const result = await Course.update({_id : id} , {   // 1st arg->filter object , 2nd arg -> update object
  //     // use updates operators..
  //   $set : {
  //     author : "Engr Zainab Fatima" ,
  //     isPublish : false
  //   }
  // })  
  // console.log(result)   // get update object , NOT updated course . 

  // to get updated course obejct .
  const course = await Course.findByIdAndUpdate(id , {   // 1st arg-> id , 2nd arg -> update object , 3rd Arg -> to get updates
    // use updates operators..
  $set : {
    author : "Engr Adeeba Fatima" ,
    isPublish : false
  }
} , { new : false} /* false by default.. if false : get course obj from database without update*/ )  
console.log(course)  
}
//updateCourse('632d62ba7bd87eca1956fc43')



          // Delete course
async function  deleteCourse(id) {
  const result = await Course.deleteOne({_id : id})
  console.log(result)   // get reult object not deleted course..

  // const course = await Course.findByIdAndRemove()  // get deleted course obj 
  // console.log(course)
}
//deleteCourse('632d62ba7bd87eca1956fc43')