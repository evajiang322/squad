$(function(){
  $("body").keydown(function(event){
    $("#testbox").html(event.which);
  });

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
//   ctx.font = "20px Georgia";

//Furthest Coordinates for the canvas = (500,375)
var alphabet = ["a","b","c","d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var letters_to_delete = [];


$("canvas").click(function generateRandomBubble(){
  var index = Math.floor((Math.random() * alphabet.length - 1) + 1);
  index = index % alphabet.length;
  var random_letter = alphabet[index];
  var centerx = Math.floor(Math.random() * (canvas.width - 10 + 1)) + 10;
  var centery = Math.floor(Math.random() * (canvas.height - 10 + 1)) + 10;
  // var bubbleSize = 10;
  ctx.fillText(random_letter, centerx , centery);
  ctx.beginPath();
  ctx.arc(centerx+4, centery-4, 10, 0, 2 * Math.PI);
  ctx.stroke();
});


});
