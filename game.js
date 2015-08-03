$(function(){
  $("body").keydown(function(event){
    $("#testbox").html(event.which);
  });

  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
//   ctx.font = "20px Georgia";

//Furthest Coordinates for the canvas = (500,375)


$("canvas").click(function generateRandomBubble(){
  var ranNum1 = Math.random()*500;
  var ranNum2 = Math.random()*375;
  var num = ranNum1;
  var num2 = ranNum2;
  var bubbleSize = 10;
  ctx.fillText("w", num , num2);
  ctx.beginPath();
  ctx.arc(num+4, num2-4, bubbleSize, 0, 2 * Math.PI);
  ctx.stroke();
});






});
