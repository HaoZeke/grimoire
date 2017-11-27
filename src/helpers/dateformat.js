var helperMarkdown = require('handlebars-dateformat');
 
module.exports.dateFormat = function (str, pattern){
  return helperMarkdown(str, pattern)
}