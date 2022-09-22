//  sync
// console.log("Before")
// let user = getuser(1)
// let repos = repo(user)
// console.log("After")

//  Async
const getUser = (id ) => {
    return new Promise( (resolve , reject ) => {
        setTimeout( () =>{
            console.log("Read Database");
            resolve({"id":id , "username" : "dar"})
    }  , 2000)
    })   
}
const repo = (username ) => {
    return new Promise ( (resolve , reject ) =>{
        setTimeout( () => {
            console.log("REad git")
            resolve([`${username}repo1`,`${username}repo2`])
        },2000)
    })  
}
const getCommit  = (repository ) => {
    return new Promise( (resolve , reject ) => {
        setTimeout(() => {
            console.log("read commit")
            resolve([`${repository} commit1` , `${repository} commit2`])
        } ,2000)
    })
}


// const diplayRepo = (repo )=> {
//     console.log(repo)
//     getCommit(repo[0] , displayCommit)

// }
// const displayUser = (user) => {
//     console.log(user)
//     repo(user.username ,diplayRepo)
// }
// const displayCommit = commit => {
//     console.log(commit)
// }
// console.log("Before")
// getUser(1 ,displayUser )  
// console.log("After")

    // do this with promise
console.log("Before")

// getUser(1)
//         .then(user => repo(user.username))
//         .then(repo => getCommit(repo[0]))
//         .then(commit => console.log(commit))
//         .catch(err => console.log("Erro",err.message))  // catch error of any of Asynchronous operation 
//                                                         // (for all then there is one catch)

console.log("After")


            // use Async / wait approach
    // use 'await' operator to make simple sync -> async
    // when use await operator , must decorate it with async modifier
    // await operator release thread untill it get result to be ready
    // in Promise we have .catch() and .then() , in this approach we have try/catch block
async function showCommits() {
    try {
        const user = await getUser(1)
        const repos = await repo(user.username)
        const commit = await getCommit(repos[0])
        console.log(commit)
        }
    catch(err){    
        console.log(err.message)
    }
    
}

 showCommits(  )  // return a Promise of void  
// there are several pattern to deal with async js
// callback
// promises
//async / await

 