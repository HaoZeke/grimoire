// sideNav.js
var u = require('umbrellajs').u;
// Sidebar
var htmlStyles = window.getComputedStyle(document.querySelector("html"));
var rowNum = parseInt(htmlStyles.getPropertyValue("--navColSize"));

u(document).on('click',"#toggle", function() {
  u("#toggle").toggleClass("closed");
  u(".menu").toggleClass("closed");
  u('.js-accordion minimalist-accordion').off('click');
  u('.hamburger').toggleClass('is-active');
  u('.gridMenu').toggleClass('showMenu');
  if (u("#toggle").hasClass("closed")) {
	document.documentElement.style.setProperty("--navColSize", ".4fr");
} else {
	document.documentElement.style.setProperty("--navColSize", ".05fr");
}
});

// Luxbar enhancement (dead for now)
// u(document).on('click',".luxbar-header", function(){
// 	console.log("Hi I run!")
//   u('#luxbar-input').click();
// });