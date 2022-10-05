const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

// using REfrence document approach..
   // no proper relation .. eg if we give invalid author id mongo is perfecty fine...
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Author'  // name of target collection...
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author' , 'name bio -_id')
    .select('name -_id ');
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Node Course', '633c87e013be537c2271f1d6')

listCourses();