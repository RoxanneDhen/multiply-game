// global variables
var lives = 3;
var score = 0;
var scorePerAnswer = 5;

/* 
 Generates random number. 
 @return random number from 1-10 
*/
function generateNumber() {
    var randomNum = Math.floor((Math.random() * 10) + 1);
    console.log("number generated " + randomNum);
    return randomNum;
}

/*
 Displays randomly generated numbers on the webpage.
*/
function displayFactors() {
    // get the html element with id = factor1
    var factor1 = document.getElementById('factor1');
    // generate random number
    factor1.innerHTML = generateNumber();
    // get the html element with id = factor2
    var factor2 = document.getElementById('factor2');
    factor2.innerHTML = generateNumber();
}

/*
  Sets up the page by showing the number sentence and hiding the start button.
*/
function startGame() {
    // get the html element corresponding to the button
    var startButton = document.getElementById('start');
    // hide the button
    startButton.style.display = "none";
    // get the html element corresponding to the number sentence
    var question = document.getElementById('numberSentence');
    // show the number sentence
    question.style.display = "block";
    displayFactors();
}

/*
  Checks the answer entered.
  @return true if correct, false otherwise
*/
function checkAnswer() {
    // get first factor
    var factor1 = document.getElementById('factor1').innerHTML;
    console.log("factor 1 = " + factor1);
    // get second factor
    var factor2 = document.getElementById('factor2').innerHTML;
    console.log("factor 2 = " + factor2);
    // get answer
    var answer = document.getElementById('answer').value;
    console.log("answer = " + answer);
    console.log((factor1*factor2) == answer);
    return (factor1*factor2) == answer;
}

/*
  Decrement lives if answer is wrong.
*/
function takeLifeAway() {
    // identify id of the heart image to remove
    var lifeId = "h" + lives;
    console.log("heart id: " + lifeId);
    var life = document.getElementById(lifeId);
    // if answer is wrong, decrement lives and remove a heart on the screen
    if (!checkAnswer()) {
        lives--;
        console.log("lives left: " + lives);
        life.style.display = "none";
		document.getElementById('wrong').play();
    }
}

/*
  Checks if there are lives left and informs user when game is over.
  @return true if game over, otherwise false
*/
function checkGameOver() {
    if (lives == 0) {
        console.log("game over");
        return true;
    }
    return false;
}

/*
  Show game over sign.
*/
function displayGameOver() {
    // get the html element corresponding to game over sign
    var gameoverSign = document.getElementById('gameover');
    gameoverSign.style.display = "block";
}

/*
  Hide question and score.
*/
function hideGame() {
    // get the html element corresponding to the question and score
    var mainGame = document.getElementById('mainGame');
    mainGame.style.display = "none"
}

/*
  Increment score if answer is correct.
*/
function addScore() {
    var screenScore = document.getElementById('score');
    if (checkAnswer()) {
        score += scorePerAnswer;
        console.log("score: " + score);
        screenScore.innerHTML = score;
		document.getElementById('right').play();
    }
}

/*
  Display success sign.
*/
function displaySuccess() {
    var success = document.getElementById('success');
    success.style.display = "block";
}

/*
  Check if player won.
*/
function checkSuccess() {
    if (score == 100) {
        console.log("Score = 100. Well done!");
        hideGame();
        displaySuccess();
    }
}

/*
  Checks answer, decrements life if wrong, increases score if correct.
*/
function processAnswer() {
    var answer = document.getElementById('answer');
    // if answer field is empty, do nothing
    if (answer.value == "") {
        return;
    }
    // increase score if correct
    addScore();
    checkSuccess();
    // take life if wrong
    takeLifeAway();
    // display gameover if lives = 0
    if(checkGameOver()) {
        hideGame();
        displayGameOver();
    }
    displayFactors();
    answer.value = "";
}