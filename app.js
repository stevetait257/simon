const colouredButtons = document.querySelectorAll('.button');
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

function resetUserSequence() {
  userSequence.length = 0;
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
  console.log('Wrong, start again');
  resetUserSequence();
  gameSequence.length = 0;
  level = 1;
}


const flash = (button) => {
  return new Promise((resolve) => {
    button = document.getElementById(button)
    button.classList.toggle('flash');
    setTimeout(() => {
      button.classList.toggle('flash');
      resolve();
    }, 500);
  });
}
const renderFlashes = async () => {
  for (const light of gameSequence) {
    await flash(light);
  }
};


function checkUserInput(computerGeneratedSequence, usersEnteredSequence) {
  if (JSON.stringify(computerGeneratedSequence) === JSON.stringify(usersEnteredSequence)) {
    console.log('checking users input');
    level++;
    console.log(`Congrats, you're now on level ${level}`);
    computerGo();
    resetUserSequence();
    addToGameSequence();
  } else {
    gameOver();
  }
}

function handleUserInput() {
  if (userTurn) {
    console.log(this.id);
    userSequence.push(this.id);
  } else {
    return;
  }
  if (gameSequence.length === userSequence.length) {
    checkUserInput(gameSequence, userSequence);
  }
}
