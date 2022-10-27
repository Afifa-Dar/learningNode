const bcrpyt = require('bcrypt');

async function run(){
    const salt = await bcrpyt.genSalt()   // salt is a random string use to add it before and after hashed value..
    // purpose it to make it diffult for hacker to hack
    // on every invocation it generetae new sets of random string
    console.log(salt)
    const hash =await  bcrpyt.hash("1234",salt)  // for dehashing we must know salt value 
    console.log(hash)
}

run()