let server ;
const request = require('supertest');
const {Genere} = require('../../models/genere')
const {User} = require('../../models/regesterUser')

describe('/api/genere' , () => {
    beforeEach( () => { server = require('../../index') })
    afterEach( async () => { 
         server.close(); 
        await Genere.deleteMany({})
    })

    describe('./GET' , () =>{
        it("Should return all genere" , async () => {
            // Populate database...
            await Genere.collection.insertMany([
                {
                    'title' : "genere1"
                },
                {
                    "title" : "ganere2"
                }
                ])
            
            const res = await request(server).get('/api/genere')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some( g => g.name = "genere1"))
            expect(res.body.some( g => g.name = "genere2"))
        })
    })

    describe('./GET/:id' , () => {
        it("Should return a specific genere" , async () => {
                const genere = new Genere({"title" : "genere"})
                await genere.save()

                const res = await request(server).get(`/api/genere/${genere._id}`)
                expect(res.status).toBe(200)
                expect(res.body.length).toBe(1)
                expect(res.body[0]).toHaveProperty("title" , genere.title)
        })
        it("Should return 404 error if a genere not exist" , async () => {
            const res = await request(server).get('/api/genere/6')
            expect(res.status).toBe(404)

        })
    })
  
    describe('/POST' , () => {
        let title ;
        let token ;
        const exec = async () => {
            return await request(server)
                            .post('/api/genere')
                            .set('x-auth-token' , token)
                            .send({title })
        }

        beforeEach(() => {
            token = new User().getAuthToken()
            title = "genere"
        })

        it("Should return 401 if user not loggin in" , async () => {  
            token = ""
            const res = await exec()
            expect(res.status).toBe(401)
        })
        it("Should return 400 if genere is inValid" , async () => {
             title = "abc"
            const res = await exec()
            expect(res.status).toBe(400)
        })
        it("Should store in databse if genere is Valid" , async () => {  //if user send invalid token 
                                                                        //its perfectly fine
                                                                        //that not good
            const res = await exec()
            const genere = await Genere.find({name : "genere"})
            expect(genere).not.toBeNull()
        })
        it("Should send genere in response if genere is Valid" , async () => {
            const res = await exec()
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('title' , "GENERE")
        })
    })
    
})