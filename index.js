
// alert("js loaded");
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    console.log("started");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); // getting id of the button
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // check if user has pressed right button
  if(userClickedPattern.length === gamePattern.length) {
    if(userClickedPattern[userClickedPattern.length - 1] === gamePattern[gamePattern.length - 1]) {
      setTimeout(function () {
            nextSequence();
      }, 1000);
    }
    else {
      wrong();
    }
  }

  else {
    var len = userClickedPattern.length - 1;
    if(gamePattern[len] != userClickedPattern[len])
    {
      wrong();
    }
  }

});

function wrong() {
  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  level = 0;
  gamePattern = [];
  started = false;
}



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
