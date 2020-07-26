const colouredButtons = document.querySelectorAll('.button')
const buttonColours = [];
for (const button of colouredButtons) {
  button.addEventListener('click', handleUserInput);
  buttonColours.push(button.id);
};
const startButton = document.querySelector('#start').addEventListener('click', startGame);
const NUMBER_OF_BUTTONS = document.querySelectorAll('.button');
const gameSequence = [];
const userSequence = [];
let level = 1;
let userTurn;

function computerGo() {
  userTurn = false;
}

function userGo() {
  userTurn = true;
}

function startGame() {
  console.log('Game Started');
  computerGo();
  addToGameSequence();
}

function addToGameSequence() {
  const randomNumber = Math.floor(Math.random() * NUMBER_OF_BUTTONS.length);
  gameSequence.push(buttonColours[randomNumber]);
  console.log(gameSequence);
  userGo();
}

function gameOver() {
  userSequence.length = 0;
  gameSequence.length = 0;
}

function checkUserInput(computerGeneratedSequence, usersEnteredSequence) {
  if (JSON.stringify(computerGeneratedSequence) === JSON.stringify(usersEnteredSequence)) {
    level++;
    console.log(level);
    computerGo();
    addToGameSequence();
  } else {
    gameOver();
  }
}



function handleUserInput() {
  if (userTurn) {
    console.log(this.id);
    userSequence.push(this.id);
  }
  if (gameSequence.length === userSequence.length) {
    checkUserInput(gameSequence, userSequence)
  }
}
