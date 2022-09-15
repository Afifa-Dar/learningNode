var _ = require('underscore');

//require() after get arguments take it as
// 1 core module..  if no such module found then..
// 2 file / folder...  ./ -> file.. if not then it found any folder nmaed underscore having indx.js file..if not
// 3 assumed that it is modle  store in node modules

const result = _.contains([2,4,6],7);
console.log(result);