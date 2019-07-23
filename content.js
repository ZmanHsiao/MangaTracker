//var firstHref = $("a[href^='http']").eq(0).attr("href");
//console.log(firstHref);

//Grab title of each webpage
$(function() {
  var title = $('title')[0].innerText;
  var url = $(location).attr('href');
  console.log(title);
  console.log(url);
  console.log(window.location.host); // can also use hostname
  console.log(window.location.pathname);
})
// content.js
