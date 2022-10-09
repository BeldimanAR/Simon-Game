var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  answerCorrect();
  console.log(gamePattern);
  console.log(userClickedPattern);
})

$(document).keypress(function(){
  if(started === false){
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  }
})

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColours = buttonColours[randomNumber];
  gamePattern.push(randomChosenColours);
  $("#" + randomChosenColours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColours);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(x){
  $("." + x).addClass("pressed");
  setTimeout(function(){
    $("." + x).removeClass("pressed");
  }, 300)
}

function answerCorrect(){
  if( gamePattern.length === userClickedPattern.length && gamePattern.every(function(element, index){ return element === userClickedPattern[index]})){
    setTimeout(function(){
      nextSequence();
    }, 1000)
    userClickedPattern = [];
  }

  else if (gamePattern[userClickedPattern.length-1] != userClickedPattern[userClickedPattern.length-1]){
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;

}
