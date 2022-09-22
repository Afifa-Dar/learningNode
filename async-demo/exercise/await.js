
async function runer(){
    try {
        const costumer = await getCustomer()
        console.log("Costumer" , costumer)
        if (costumer.isGold){
            const movies = await getTopMovies()
            console.log("Movies",movies)
             await sendEmail(costumer.email , movies)
             console.log('email Sent')
        }
    }
    catch(err){
        console.log(err.message)
    }
}
runer()

function getCustomer(id) {
    return new Promise( ( resolve , reject) =>{
        setTimeout(() => {
            resolve({ 
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000);  
    })
  }
  
  function getTopMovies() {
    return new Promise( (resolve , reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
    })
  }
  
  function sendEmail(email, movies) {
    return new Promise ( ( resolve , reject) => {
        setTimeout(() => {
            //resolve();
            reject(new Error("Cant send email"))
          }, 4000);      
    })
}