const p = Promise.resolve({id : 1 })  // promise that already resolve. Useful while writing unit testing
p.then(res => console.log(res))

const pr = Promise.reject(new Error(" Reason behind rejection"))    // promise that already reject
pr.catch(err => console.log(err.message))

// parallel promises

p1 = new Promise( (resolve , reject) => {
   setTimeout( () => {
    console.log("Reading Fb API")
    reject(new Error("Something went wrong..."))
   },3000)
})

p2 = new Promise( (resolve , reject) => {
    setTimeout( () => {
     console.log("Reading insta API...")
     resolve(2)
    },2000)
 })
 
 //when result of both sync operation are ready
 // use  method "all" that is available only on Promise class not object

//  Promise.all([p1 , p2 ])
//                         .then(res => console.log(res)) 
//                         .catch(err => console.log(err.message)) // if any of the promise reject it return error (catch run)

// result when one of the async operation are done
 // use  method "race" that is available only on Promise class not object

 Promise.race([p1,p2])
                .then(res => console.log(res)) 
                .catch(err => console.log(err.message)) // if any of the promise reject it return error (catch run)

// here it get 2 [( result of p2 ) becz it run first becz it wait time less then p1..] and after this it return val

