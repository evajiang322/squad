
//Checks the state of the game.
//This is just for aesthetics
  $("#paused").hide();
  $("#gameOverPic").hide();
  $("#staticButton").hide();
  $("#fallingButton").hide();
  $("#selectVersionPrompt").hide();
  $("#countdown").hide();


//for scope issues
var score_value = 0;
var generating = 0;
var startBtnPressed = false;
var isGameOver = false;
var countdownTimer = 0;
var versionSelected = false;
var whichVersion = "...";
var volumeOn = true;
var allSoundsPop = document.getElementById('popSound');
var allSoundsTime = document.getElementById('timesUpMp3');
var generating_falling = 0;

//let the user turn the volume on or off
$("#sound").click(function(){
  if(volumeOn)
  {
    volumeOn = false;
    $(this).attr('src','https://lh3.ggpht.com/K6PQwW_obxSIliOtx98EW002lZQ01BYRSLztDpPwxQiNrw35CWnPcfjm0AK6fbP69P4=w300');
    allSoundsPop.muted = true;
    allSoundsTime.muted = true;
  }
  else {
    {
      volumeOn = true;
      $(this).attr('src','https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/volume_down.png');
      allSoundsPop.muted = false;
      allSoundsTime.muted = false;
    }
  }


});




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
        window.cancelAnimationFrame(raf);
        $("#timesUpMp3").ready(function() {finishPlay();});

    } else {
        seconds--;
    }
}

//pop sound
function play(){
       var audio = document.getElementById("popSound");
       audio.play();
}

function finishPlay(){
    var audio = document.getElementById("timesUpMp3");
    audio.play();
}


//start
$("#startButtonPic").click(function(){
  $("#startButtonPic").hide();
  startBtnPressed = true;
  $("#staticButton").show();
  $("#fallingButton").show();
  $("#selectVersionPrompt").show();
  $("#countdown").show();


  $("#staticButton").click(function() {
    $(this).css("background-color","blue");
    whichVersion = "normal";
    versionSelected = true;
    $("#staticButton").hide();
    $("#fallingButton").hide();
    $("#selectVersionPrompt").hide();
    $("#staticButton").hide();
    $("#fallingButton").hide();
    generating = setInterval('generateRandomBubble()', 700);
    countdownTimer = setInterval('secondPassed()', 1000);

  });

  $("#fallingButton").click(function() {
    whichVersion = "falling";
    versionSelected = true;
    $("#staticButton").hide();
    $("#fallingButton").hide();
    $("#selectVersionPrompt").hide();
    generating_falling = setInterval('generateFallingBubble()', 500);
    //calling the animation:
    raf = window.requestAnimationFrame(draw);
    countdownTimer = setInterval('secondPassed()', 1000);

  });

});



//pause and resume button.
var isPaused = true;
$("#pauseResumeGame").click(function(){
  if(startBtnPressed && !isGameOver && versionSelected){
    if(isPaused){
      $("#countdown").hide();
      $("#pauseResume").html("Resume");
      $("#paused").show();
      clearInterval(generating);
      clearInterval(countdownTimer);
      //stopping the animation:
      window.cancelAnimationFrame(raf);
    }else{
      $("#pauseResume").html("Pause");
      $("#countdown").show();
      generating = setInterval('generateRandomBubble()', 1000);
      countdownTimer = setInterval('secondPassed()', 1000);
      raf = window.requestAnimationFrame(draw);
      $("#paused").hide();
    }
    isPaused = !isPaused;
  }
});


// vvvvvvv Canvasing begins here vvvvvvv
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var alphabet = ["a","b","c","d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var letters_to_delete = [];
var x_coord = [];
var y_coord = [];
// var bubble_time = [];


function generateRandomBubble(){
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
  if (isPaused && !isGameOver){
    //this gets the keycode and converts the number to a lowercase letter
    keynum = event.which;
    letter_pressed = String.fromCharCode(keynum).toLowerCase();

    //deleting. aka drawing over the thing.
    for (var i = 0; i < letters_to_delete.length; i++){
      if (letters_to_delete[i] === letter_pressed){
        score_value += 100;
        $("#popSound").ready(function() {play();});
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
      else if(i === letters_to_delete.length - 1){
        score_value -= 200;
        if(score_value <= 0){
          score_value = 0;
        }
        $("#score_val").html(score_value);
      }
    }
  }
});

$("#score_val").html(score_value);


// FOR BUBBLES TO FALL DOWN THE CANVAS:
var falling_list = [];
var raf = 0;

function bubble(random_letter, centerx, random_rate){
  this.x = centerx;
  this.y = 30;
  this.vy = random_rate;
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

function generateFallingBubble(){
  //getting a random index number to get a random letter from alphabet
  var index = Math.floor((Math.random() * alphabet.length - 1) + 1);
  index = index % alphabet.length;
  var random_letter = alphabet[index];
  var random_rate = Math.ceil((Math.random() * 5 - 1) + 1);

  var centerx = Math.floor(Math.random() * ((canvas.width - 26) - 26 + 1)) + 26;

  //checking to make sure that the coordinates won't overlap each other
  for (i=0; i < falling_list.length;i++){
    xdiff = Math.abs(centerx - falling_list[i].x);
    ydiff = Math.abs(50 - falling_list[i].y);
    if (xdiff <= 50){
      return;
    }
  }

  //creating the circle
  var circle = new bubble(random_letter, centerx, random_rate);
  circle.draw();
  falling_list.push(circle);
}

//drawing the new position of the circle when it 'moves'
function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  for (i=0; i< falling_list.length; i++){
    falling_list[i].draw();
    falling_list[i].y += falling_list[i].vy;
    checkFallingY(i);
  }
  raf = window.requestAnimationFrame(draw);
}

$(document).keydown(function(event){
  if (isPaused && !isGameOver){
    //this gets the keycode and converts the number to a lowercase letter
    keynum = event.which;
    letter_pressed = String.fromCharCode(keynum).toLowerCase();

    //deleting. aka drawing over the thing.
    for (var i = 0; i < falling_list.length; i++){
      if (falling_list[i].letter === letter_pressed){
        $("#popSound").ready(function() {play();});
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
      //if the key pressed does not match any of the letters on screen
      else if(i === falling_list.length - 1){
        score_value -= 50;
        if(score_value <= 0){
          score_value = 0;
        }
        $("#score_val").html(score_value);
      }
    }
  }
});

$("#score_val").html(score_value);

//when the bubble reaches the bottom of the canvas, delete from list and subtract points.
function checkFallingY(i){
    if (falling_list[i].y >=500){
      score_value -= 50;
      falling_list.splice(i, 1);
      if (score_value <= 0){
        score_value = 0;
      }
      $("#score_val").html(score_value);
    }
}
