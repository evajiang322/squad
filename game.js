
//Checks the state of the game.
//This is just for aesthetics
  $("#paused").hide();
  $("#gameOverPic").hide();


//for scope issues
var score_value = 0;
var generating = 0;
var startBtnPressed = false;
var isGameOver = false;
var countdownTimer = 0;
// var countdownBubble = 0;
// var bubbleRemoval = 0;

// countdown timer
var seconds = 59;
function secondPassed() {
    var minutes = Math.round((seconds - 30)/60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
    if (seconds == 0) {
        clearInterval(generating);
        clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = "Time's Up!";
        $("#gameOverPic").show();
        isGameOver = true;

    } else {
        seconds--;
    }
}


//start
$("#startButtonPic").click(function(){
  $("#startButtonPic").hide();
  startBtnPressed = true;
  // generating = setInterval('generateRandomBubble()', 1000);
  // countdownTimer = setInterval('secondPassed()', 1000);
  // countdownBubble = setInterval('decrease_btime()', 1000);
  // bubbleRemoval = setInterval('bubble_removal()', 1000);
});

//pause and resume button.
// var isPaused = true;
// $("#pauseResumeGame").click(function(){
//   if(startBtnPressed && !isGameOver){
//     if(isPaused){
//       $("#pauseResume").html("Resume");
//       $("#paused").show();
//       clearInterval(generating);
//       clearInterval(countdownTimer);
//       // clearInterval(countdownBubble);
//       // clearInterval(bubbleRemoval);
//     }else{
//       $("#pauseResume").html("Pause");
//       generating = setInterval('generateRandomBubble()', 1000);
//       countdownTimer = setInterval('secondPassed()', 1000);
//       // countdownBubble = setInterval('decrease_btime()', 1000);
//       // removeTimer = setInterval('remove_bubble()', 1000);
//       $("#paused").hide();
//     }
//     isPaused = !isPaused;
//   }
// });


// vvvvvvv Canvasing begins here vvvvvvv
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var alphabet = ["a","b","c","d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var letters_to_delete = [];
var x_coord = [];
var y_coord = [];
var bubble_time = [];


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
  // bubble_time.push(5);


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
  // if (isPaused && !isGameOver){
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
      }
      else if(i === letters_to_delete.length - 1 && letters_to_delete[i] !== letter_pressed){
        score_value -= 200;
        if(score_value <= 0){
          score_value = 0;
        }
        $("#score_val").html(score_value);
      }
    }
  //}
});

$("#score_val").html(score_value);

//
//for the bubbles to fall down the page:
var falling_list = [];
var raf = 0

function bubble(random_letter, centerx){
  this.x = centerx;
  this.y = 30;
  this.vy = 2;
  this.letter = random_letter;
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x+3, this.y-4, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.font = "20px serif";
    ctx.fillText(random_letter, this.x , this.y);
    ctx.stroke();
  }
}

$("#canvas").click(function generateFallingBubble(){
  //getting a random index number to get a random letter from alphabet
  var index = Math.floor((Math.random() * alphabet.length - 1) + 1);
  index = index % alphabet.length;
  var random_letter = alphabet[index];

  var centerx = Math.floor(Math.random() * ((canvas.width - 26) - 26 + 1)) + 26;
  var centery = Math.floor(Math.random() * ((canvas.height - 26) - 26 + 1)) + 26;

  //checking to make sure that the coordinates won't overlap each other
  for (i=0; i < falling_list.length;i++){
    xdiff = Math.abs(centerx - falling_list[i].x);
    ydiff = Math.abs(centery - falling_list[i].y);
    if (xdiff <= 50){
      return;
    }
  }

  //creating the circle
  var circle = new bubble(random_letter, centerx);
  circle.draw();
  falling_list.push(circle);
  console.log(falling_list);

  raf = window.requestAnimationFrame(draw);
});

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  for (i=0; i< falling_list.length; i++){
    falling_list[i].draw();
    falling_list[i].y += falling_list[i].vy;
  }
  raf = window.requestAnimationFrame(draw);
}

$(document).keydown(function(event){
  // if (isPaused && !isGameOver){
    //this gets the keycode and converts the number to a lowercase letter
    console.log("beginning of function:" + falling_list);
    keynum = event.which;
    letter_pressed = String.fromCharCode(keynum).toLowerCase();
    // console.log(letter_pressed);
    //deleting. aka drawing over the thing.
    for (var i = 0; i < falling_list.length; i++){
      if (falling_list[i].letter === letter_pressed){
        score_value += 100;
        $("#score_val").html(score_value);
        ctx.beginPath();
        ctx.arc(falling_list[i].x+3, falling_list[i].y-4, 26, 0, 2 * Math.PI);
        ctx.fillStyle = "lavender";
        ctx.strokeStyle = "lavender";
        ctx.fill();
        ctx.stroke();

        falling_list.splice(i, 1);
        return;
      }
      else if(i === falling_list.length - 1 && falling_list[i].letter !== letter_pressed){
        score_value -= 200;
        if(score_value <= 0){
          score_value = 0;
        }
        $("#score_val").html(score_value);
      }
    }
  //}
});

$("#score_val").html(score_value);


//counting down the seconds for each bubble
// function decrease_btime(){
//   for (i = 0; i< bubble_time.length; i++){
//     bubble_time[i] -= 1;
//   }
//   console.log(bubble_time);
// }


//removing the bubbles that has reached 0 in its own timer
// function bubble_removal(){
//   for (i=0; i<3; i++){
//     if (bubble_time[i] === 0){
//       ctx.beginPath();
//       ctx.arc(x_coord[i]+3, y_coord[i]-4, 26, 0, 2 * Math.PI);
//       ctx.fillStyle = "lavender";
//       ctx.strokeStyle = "lavender";
//       ctx.fill();
//       ctx.stroke();
//
//       letters_to_delete.splice(i, 1);
//       x_coord.splice(i, 1);
//       y_coord.splice(i, 1);
//       bubble_time.splice(i, 1);
//     }
//   }
// }
