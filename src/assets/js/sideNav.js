// sideNav.js
var u = require('umbrellajs').u;
// Sidebar
var htmlStyles = window.getComputedStyle(document.querySelector("html"));
var rowNum = parseInt(htmlStyles.getPropertyValue("--navColSize"));

u(document).on('click',"#toggle, .gridMenu", function() {
  u("#toggle").toggleClass("closed");
  u(".menu").toggleClass("closed");
  u('.burger').toggleClass('openBurger');
  u('.gridMenu').toggleClass('showMenu');
  if (u("#toggle").hasClass("closed")) {
	document.documentElement.style.setProperty("--navColSize", ".4fr");
} else {
	document.documentElement.style.setProperty("--navColSize", ".05fr");
}
});
