// promose is an object that holds an eventual result of Async operation..
// either result in value or error..
// 3 stages of promise 1- pending  2- fulfilled  3- reject

const p = new Promise( ( resolve , reject ) => {//construct a function with two parameter (resolve , reject)
    // kick off som Async work
    let a = false
    setTimeout( () => {
         // send result to consumer of this object

        if(a) resolve("5+8")   // pending -> fulfilled / resolved
        else  reject(new Error("a not exist"))  // pending -> reject
    } , 2000) })
    
p.then( res => console.log(res))   // get result
 .catch(err => console.log(err.message))    // get error