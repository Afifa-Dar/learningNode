const {fizzBuzz} = require("../exercise1")

describe("FizzBuzz" , () => {
    it("should throw an error if input is not a number" ,() => {
        expect(() => fizzBuzz("abc") ).toThrow()
        expect(() => fizzBuzz({}) ).toThrow()
        expect(() => fizzBuzz(null) ).toThrow()
        expect(() => fizzBuzz(undefined) ).toThrow()
    });
    
    it("should return 'FizzBuzz' if input is divisible by 3 and 5" ,() => {
        const result = fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    });

    it("should return 'Fizz' if input is divisible by 3" ,() => {
        const result = fizzBuzz(9)
        expect(result).toBe('Fizz')
    });

    it("should return 'Buzz' if input is divisible by 5" ,() => {
        const result = fizzBuzz(10)
        expect(result).toBe('Buzz')
    });

    it("should return input  if input is not divisible by 5 or 3" ,() => {
        const result = fizzBuzz(7)
        expect(result).toBe(7)
    });
})
