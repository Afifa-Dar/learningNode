var express = require('express')
const res = require('express/lib/response')

// use joi to facilitate input validation...
const Joi = require('joi')  // return class that is store in Joi..


const app = express()   // returns an object having bunch of useful methods..

//enable JSON object in request body
app.use(express.json());
//app.use() use middleware to the requset body

app.get('/', (req, res) => {
    res.send(`<h1>Welcom to the  node!!</h1>`)

})  //1st arg->path or url (/->root of web)  
//2nd-> callba k function that call when we have http get request on that end point..

app.get('/api/courses', (req, res) => {
    for (i of ['AI', 'NM', "CNN", 'WE', 'TPL']) {
        res.write(`<h1>${i}</h1>`)
    }
    res.end()

})
// res.send is an express feature.. it is eqavlaent to res.write+res.end
// res.send only called once Whereas res.writw called multiple time followed by res.send
//res.send() set header ,send res and end res 


//when we deploy our site in poduction environmet port is automatically assigned
// we fix it by sing environent variable
// environement varabile is the variable that is a part of environment in which application run
// its value set outside the application
// set it using global object called process

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening at port ${port}.... `))

// routes parameter
// to get specific course
// we use route parameter for essential or required value
// we use query string to provide addtional data to backend services.. we use it for anything that is optional
//query string store in object in key+val pair


const courses = [
    {
        courseCode : "CT-257",
        courseTitle : "Artificial Intelligence"

    },
    {
        courseCode : "CT-258",
        courseTitle : "Data Science"
    },
    {
        courseCode : "CT-247",
        courseTitle : "Autometa"
    }
]
app.get('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.courseCode === req.params.id)  //fund course req by user in course obj
    if(!course) res.status(404).send("Course Not found")     // if no course correspond to the id
    else {
            res.write(`<h1>${course["courseCode"]}</h1>`)
            res.write(`<li>${course["courseTitle"]}</li>`)            
            res.end()
    }
})

//HTTP post request
// to create new course
 
app.post('/api/courses',( req , res ) => {

    //validate input given from user through req body
    if(!req.body.id || !(req.body.id == req.body.id.match(/CT-[0-9]{3}/))) //DONt use === becz lhs type 'string' whereas RHS type 'object'
      {
        // give 400 error ststus code ie Bad Request
        res.status(400).send('proper id should be insert')
        return
    }
    // if(!req.body.name || !(req.body.name == req.body.name.match(/[a-z]+/i))){
    //     // give 400 error ststus code ie Bad Request
    //     res.status(400).send('proper name should be insert')
    //     return
    // }

    // validate name using Joi...
    // 1st we need to define schema..
    // in schema we define the shape of object..(what props , what are the type of prop ...)

   

       // validate
        
        // const result = Joi.validate(req.body , schema);  // in earlier version

        let { error } = courseValidation(req.body.name);

        // invalid changes , send 400 error
          if(error) 
          {
              res.status(400).send(error.details[0].message)
              return
          }
    const course = {
        courseCode : req.body.id,
        courseTitle : req.body.name
    }
    courses.push(course);
    res.end()    // we must have to enn req otherwise browser wait for further response to add for client
    //res.send(course);   // in res.send() it implicitly added (res.end)
})
 



//     Handling Put method
//      put() use to update data


app.put('/api/courses/:id', (req , res ) => {

  // finc the course
  const course = courses.find(c => c.courseCode === req.params.id) 
  console.log(course)

  // no coure found send 404 error
  if(!course) res.status(404).send("Course Not found")

  //validate changes
    //let result = courseValidation(req.body.name)

        // we can use object destructuring to get error form result as we interenseted in just error
    let { error } = courseValidation(req.body.name);

  // invalid changes , send 400 error
    if(error) 
    {
        res.status(400).send(error.details[0].message)
        return
    }

 // if okay , update course
    course.courseTitle = req.body.name;
    res.send(course)    // for confirmation purpose
})

const courseValidation = course => {
    
    const schema = Joi.string().required().pattern(new RegExp('^[a-zA-Z ]{5,15}$'))
    const result = schema.validate(course)  
    return result
}

// Handling PUT()

app.delete('/api/courses/:id' , (req , res ) => {

    // finc the course
  const course = courses.find(c => c.courseCode === req.params.id) 
  console.log(course)

  // no coure found send 404 error
  if(!course) res.status(404).send("Course Not found")

  // Delete course
  let index = courses.indexOf(course);
  //using splice 
  courses.splice(index , 1)

  res.send(course)
})