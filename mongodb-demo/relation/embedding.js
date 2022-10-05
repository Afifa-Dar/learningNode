const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String ,
  author : {
    type : [authorSchema] ,  // arrays of authors
    required : true
  }  // sub document.. save only in the context of their parent
}));

async function createCourse(name, author) {
  const course = new Course({
    name ,
    author
  }); 
  try{
    const result = await course.save();
    console.log(result);
  }
  catch(err){
    console.log(err.message)
  }
  
}
async function updateAuthor(courseID){
  await Course.update({_id:courseID} , {  //updateing drectly approach
    $unset :{
      'author' : ""
    }
  })
  // const course = await Course.findById(courseID)  // query first approach
  // course.author.name = "Afifa Dar";
  // course.save()
}

async function addAuthor(courseId , author){
  const course = await Course.findById(courseId)
  course.author.push(author)
  course.save()
}
async function deleteAuthor(courseId , authorId){
  const course = await Course.findById(courseId)
  const author = course.author.id(authorId)
  author.remove()
  //course.save()
}


async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// createCourse('Python Course' , [
//   new Author({name : 'Afifa dar'}) ,
//   new Author({name : "Kinza Khan"})
// ]);

//addAuthor('633d6f0ca1bac7635a749e2b' , new Author({name : 'Kareem Kazi'}))
deleteAuthor('633d6f0ca1bac7635a749e2b' , '633d71e4b9e8958cdd3d4ee1')
//updateAuthor('633d500d0f9e14a473d9e726')
