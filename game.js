
//Checks the state of the game.
//This is just for aesthetics

var score_value = 0;
var isPaused = true;

$("#pauseResumeGame").click(function(){
  if(isPaused){
    $("#pauseResume").html("Resume");
  }else{
    $("#pauseResume").html("Pause");
  }
  isPaused = !isPaused;

});


$("#startButtonPic").click(function(){
  $("#startButtonPic").hide();
});

// vvvvvvv Canvasing begins here vvvvvvv
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var alphabet = ["a","b","c","d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var letters_to_delete = [];
var x_coord = [];
var y_coord = [];


function generateRandomBubble(){
  // console.log("Im clicked");
  //getting a random index number to get a random letter from alphabet
  var index = Math.floor((Math.random() * alphabet.length - 1) + 1);
  index = index % alphabet.length;
  var random_letter = alphabet[index];

  //picking random coordinates: inclusive on both ends; Math.floor(Math.random() * (max - min + 1)) + min;
  var centerx = Math.floor(Math.random() * ((canvas.width - 26) - 26 + 1)) + 26;
  var centery = Math.floor(Math.random() * ((canvas.height - 26) - 26 + 1)) + 26;

  //checking to make sure that the coordinates won't overlap each other
  for (i=0; i< x_coord.length;i++){
    if (Math.abs(centerx - x_coord[i]) <= 50 && Math.abs(centery - y_coord[i]) <= 50){
      return;
    }
  }

  //so the program knows which letters to check for to delete and its coordinates
  letters_to_delete.push(random_letter);
  x_coord.push(centerx);
  y_coord.push(centery);
  // console.log(letters_to_delete);
  // console.log(x_coord);
  // console.log(y_coord);

  //drawing the circle
  ctx.beginPath();
  ctx.arc(centerx+3, centery-4, 25, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.font = "20px serif";
  ctx.fillText(random_letter, centerx , centery);
  ctx.stroke();
}


$(document).keydown(function(event){
  //this gets the keycode and converts the number to a lowercase letter
  keynum = event.which;
  letter_pressed = String.fromCharCode(keynum).toLowerCase();
  // console.log(letter_pressed);
  //deleting. aka drawing over the thing.
  for (var i = 0; i < letters_to_delete.length; i++){
    if (letters_to_delete[i] === letter_pressed){
      score_value += 100;
      $("#score_val").html(score_value);
      ctx.beginPath();
      ctx.arc(x_coord[i]+3, y_coord[i]-4, 26, 0, 2 * Math.PI);
      ctx.fillStyle = "lavender";
      ctx.strokeStyle = "lavender";
      ctx.fill();
      ctx.stroke();

      letters_to_delete.splice(i, 1);
      x_coord.splice(i, 1);
      y_coord.splice(i, 1);

      //return is to delete only one; i-- : if you want to delete all of a certain letter on screen
      return;
      // i--;
      }
    else if(letters_to_delete[i] !== letter_pressed) {
      score_value -= 200;
      if(score_value <= 0){
        score_value = 0;
      }
      $("#score_val").html(score_value);
    }

  }
});


//calling the function generateRandomBubble continuously over timed intervals; put this into the start button/resume button
setInterval(function (){generateRandomBubble()}, 1000);

//stopping the circles from generating --> put the second part into pause button
// var generating = setInterval(function (){generateRandomBubble()}, 1000);
// clearInterval(generating);
