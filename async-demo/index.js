//  sync
// console.log("Before")
// let user = getuser(1)
// let repos = repo(user)
// console.log("After")

//  Async
const getUser = (id , callback) => {
    setTimeout( () =>{
        callback({"id":id , "username" : "dar"})
        console.log("Read Database");
    }  , 2000)
}
const repo = (username , callback) => {
    setTimeout( () => {
        console.log("REad git")
        callback([`${username}repo1`,`${username}repo2`])
    },2000)
}
const getCommit  = (repository , callback) => {
    setTimeout(() => {
        console.log("read commit")
        callback([`${repository} commit1` , `${repository} commit2`])
    } ,2000)
}
const diplayRepo = (repo )=> {
    console.log(repo)
    getCommit(repo[0] , displayCommit)

}
const displayUser = (user) => {
    console.log(user)
    repo(user.username ,diplayRepo)
}
const displayCommit = commit => {
    console.log(commit)
}
console.log("Before")
getUser(1 ,displayUser )  
console.log("After")


// there are several pattern to deal with async js
// callback
// promises
//async / await

