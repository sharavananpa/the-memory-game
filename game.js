var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keyup(function () {
    if(!started) {
        nextSequence();
        $("#level").text("Level " + level);
        started = true;
    }
});

$(".btn").click(function () { 
    if(started) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        pressAnim(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    }
});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("glitch");
        $("body").addClass("game-over");
        $("#level").text("Game Over! Score: " + (level-1));
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color) {
    var sound = new Audio("./soundfx/" + color + ".mp3");
    sound.play();
}

function pressAnim(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}