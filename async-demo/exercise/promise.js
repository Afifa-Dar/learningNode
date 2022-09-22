getCustomer(1)
                .then(costumer => getTopMovies())
                .then(movies => sendEmail())
                .then(console.log("Enail Sent"))
                .catch(err => console.log("Error" , err.message))  


function getCustomer(id) {
    return new Promise( (resolve , reject) => {
        setTimeout(() => {
            console.log("Get Costumer...")
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
    return new Promise ( ( resolve , reject) => {
        setTimeout(() => {
            console.log("Get movies...")
            if (costumer.isGold) resolve(['movie1', 'movie2']);
            else reject(new Error("Costumer is not Gold"))
          }, 4000);
    }) 
  }
  
function sendEmail() {
    return new Promise ( ( resolve , reject) => {
        setTimeout(() => {
            resolve();
          }, 4000);
    }) 
  }