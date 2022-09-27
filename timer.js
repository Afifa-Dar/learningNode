setImmediate(
    () => console.log('I am equivalent to setTimeout with 0 ms'),
  );
setTimeout( () => console.log("Hello") , 2000)
console.log("World")