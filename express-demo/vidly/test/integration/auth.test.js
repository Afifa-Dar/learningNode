let server ;
let token ;
const request = require('supertest');
const {User} = require('../../models/regesterUser')

describe("Authentication middleware" , () => {
    beforeEach( () => { 
        server = require('../../index');
        token = new User().getAuthToken()
         })
    afterEach(  () => { 
         server.close();
    })
    const exec =  () => {
        return  request(server)
                        .post('/api/genere')
                        .set('x-auth-token' , token)
                        .send({"title" : "genere" })
    }
    
    it("Should return 401 if user not loggin in" , async () => {  
        token = ""
        const res = await exec()
        expect(res.status).toBe(401)
    })

 })