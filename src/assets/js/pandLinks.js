// Produce links for pandoc generated files

var u = require('umbrellajs').u;
var fileName = location.href.split("/").slice(-1).toString();
var noSuff = fileName.substring(0, fileName.lastIndexOf('.')); 
	
u('.pdf').each(function() { u(this).attr({ href: 'pdf/'+noSuff+'.pdf' }); 
});