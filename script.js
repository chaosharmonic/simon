var buttons = ["#red", "#green", "#blue", "#yellow"];
var pattern = [];
var input = [];
var t;
var debug = [];

var strictMode = false;
var endGame = true;

var audio = {
  "#red" : "#sound1",
  "#green" : "#sound2",
  "#blue" : "#sound3",
  "#yellow" : "#sound4"
}

$("#newGame").click(function(){
  if (endGame){
    core();
  }
  else {
    endGame = true;
    input.push("new")
    check();
  }
});

$("#strict").click(function(){
  $("#strict").toggleClass("btn-danger");
  if (strictMode){
    strictMode = false;
  }
  else {
    strictMode = true;
  }
});

$("#red").click(function(){
  buttonPress("#red");
});
$("#green").click(function(){
  buttonPress("#green");
});
$("#blue").click(function(){
  buttonPress("#blue");
});
$("#yellow").click(function(){
  buttonPress("#yellow");
});


function core() {
  endGame = false;
  pattern = [];
  t = 1
  setTimeout(function(){
    turn();
  }, 600);
}

function turn() {
  input = [];
  turnDisplay.textContent = t;
  info.textContent = "";
  if (pattern.length < t){
    var rand = Math.floor(Math.random() * 4)
    pattern.push(buttons[rand]);
  }
  (0);
  showPattern();
}

function showPattern() {
  for (var i = 0; i < pattern.length; i++){
    var run = function(index){
      setTimeout(function(){
        light(pattern[index], 800);
      }, 1500*index);
    };
    run(i);
  }
}


function light(button, duration) {
  if (button === "wrong"){
    info.textContent = "Sorry, that wasn't the correct pattern.";
    setTimeout(function(){
      info.textContent = "";
    }, duration);
  }
  else {
    var sound = document.querySelector(audio[button]);
    sound.play();
    $(button).toggleClass("lit");
    setTimeout(function(){
      $(button).toggleClass("lit");
    }, duration);
  }
}


function check(){
  if (input[input.length - 1] !== pattern[input.length - 1]){
    if (endGame){
      core();
    }
    else {
      light("wrong", 800);
      if (strictMode) {
        setTimeout(function(){
          core();
        }, 3000);
      }
      else {
        setTimeout(function(){
          turn();
        }, 3000);
      }
    }
  }
  else if (input.length === pattern.length) {
    if (t < 20) {
     t++;
     turn();
    }
    if (t === 20) {
     info.textContent = "Congratulations!";
     endGame = true;
    }
  }
}


function buttonPress(color) {
  if (!endGame) {
    light(color, 400);
    input.push(color);
    if (input[input.length - 1] !== pattern[input.length - 1] || input.length === pattern.length){
      setTimeout(function(){
        check();
      }, 1500);
    }
  }
}
