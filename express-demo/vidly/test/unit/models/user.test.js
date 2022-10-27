const jsonwebtoken = require( 'jsonwebtoken' );
const jwt = require( 'jsonwebtoken' );
const {User} =require('../../../models/regesterUser')
const config = require('config');
const mongoose = require('mongoose')

describe("user.getAuthToken" , () => {  // generate test suite
    it("Should return an auth Token" , () => {
        //const id = new mongoose.Types.ObjectId()
        const payload = {
            _id : new mongoose.Types.ObjectId() ,
            isAdmin : true
        }
        
        const user = new User(payload)
        const token = user.getAuthToken()
        const decoded = jwt.verify(token ,config.get('secretKey'))
        // expect(decoded).toMatchObject({_id : id , isAdmin : true})
        expect(decoded).toMatchObject(payload)

    })
}) 