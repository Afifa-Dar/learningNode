 const mongoose = require('mongoose')

// mongoose.connect("mongodb://localhost/vidly")  //connection string. return promise
//   //. In real world application we use environemnt varaiale . Not harcoded
//   .then(() => console.log("Connected to database"))
//   .catch(err => console.error("Couldn't connect to MongoDb", err.message))


const schema = new mongoose.Schema({
    id : Number ,
    title :{
        type : String , 
        minlength : 5 , 
        maxlength : 10 , 
        match : /^[a-zA-z]+$/i,
        trim : true , 
        uppercase : true
    } 
})

const Genere = mongoose.model("Genere" , schema)


const createGenere = async (name) => {
    const genere = new Genere({
        title : name , 
        id : (await Genere.find().count())+1
     })
     //saveGenere(genere) 
     return genere
    }


const saveGenere = async (genere) => {
    try {
        const result =  await genere.save()
        console.log(result)
        }
    catch(err){
        console.log(err.message)
        }
}

async function addGenere (){
    const genere = await createGenere()
    saveGenere(genere)
}     

const updateGenere = async (id , updateTitle) => {
    await Genere.updateOne({id : id} , {   // 1st arg->filter object , 2nd arg -> update object
            // use updates operators..
        $set : {
            title : updateTitle
          }
        })
        console.log(updateTitle)
}

const deleteGenere = async id => {
    await Genere.deleteOne({ id: id })
}


module.exports.Genere = Genere
module.exports.create = createGenere
module.exports.save = saveGenere
module.exports.update = updateGenere
module.exports.delete = deleteGenere

