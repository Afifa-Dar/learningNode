const lib = require("../lib")
const db = require('../db')
const mail = require('../mail')

describe("Absolute" , () => {   // grouping a bunch of test
   it("should return positive if input is positive" , () => {   // name of test , funciton where we implement our test..
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    
   it("should return positive if input is negative" , () => {   // name of test , funciton where we implement our test..
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    
   it("should return 0 if input is 0" , () => {   // name of test , funciton where we implement our test..
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })
})

describe("Greet" , () => {
    it("should return the greeting message" , () => {
        const result = lib.greet("Afifa Dar")
        // expect(result).toBe("Welcome Afifa Dar")
        // expect(result).toContain("Afifa Dar")
        expect(result).toMatch(/Afifa Dar/i)
    })
})

describe("Get Currencies" , () => {
    it("Should return supportd currencies" , () =>{
        const result = lib.getCurrencies()
        // to general approach...

        // expect(result).toBeDefined()     
        expect(result).not.toBeNull()

        // to specific approach...
        expect(result[0]).toBe("USD")
        expect(result[1]).toBe("AUD")
        expect(result[2]).toBe("EUR")
        expect(result.length).toBe(3)
 
        // proper way...
        expect(result).toContain("USD")
        expect(result).toContain("AUD")
        expect(result).toContain("EUR")

        // ideal way...
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']))

        
    })
})

describe("Get Product" , () => {
    it("should return object" , () => {
        const result = lib.getProduct(1)
      //  expect(result).toEqual({id: 1, price: 10 })  // exact match object object.. 
       // expect(result).toMatchObject({id: 1, price: 10 })  // check wheather these (key:val) pair include in object  or not
        expect(result).toHaveProperty('id' , 1)
    })
})

// test exception...
describe("Register User" , () => {
    it.each([
        null , undefined , "" ,false , 0 ,NaN
    ])("Should throw an error if username is falsy", () => {
        expect((a) => {
            lib.registerUser(a)
        }).toThrow();
    });
    it("Should return a user object if valid username is passed" , () => {
        const result = lib.registerUser("Dar")
        expect(result).toMatchObject({
            username : "Dar"
        })
        expect(result.id).toBeGreaterThan(0)
    })
})

//fake implememtation of function geting data from database
describe("apply Discount" , () => {
    it('Should return 10% discount if user point is greater then 10' , () => {
        db.getCustomerSync = id => {
            console.log("Fake implementation...")
            return { costumerId : id , points : 20}   // replaceing function with fake function
        }
        const order = {costumerId : 1 , totalPrice : 10}
        const result = lib.applyDiscount(order)
        expect(result).toBe(9)
    })
})

describe("Notify Costumer" , () => {
    it("Shold send email to costumer" , () => {
        db.getCustomerSync = jest.fn().mockReturnValue({email : "abc"})
        mail.send = jest.fn()

        lib.notifyCustomer({costumerId:1})

        expect(mail.send).toHaveBeenCalled()
        expect(mail.send.mock.calls[0][0]).toBe("abc")
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)


    })
})