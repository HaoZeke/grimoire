var stringHelpers = require('handlebars-helpers')(['string']);
 
module.exports = function (str, pattern){
  return stringHelpers(str, pattern)
}