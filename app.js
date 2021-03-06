const colouredButtons = document.querySelectorAll('.button');
const buttonColours = [];
for (const button of colouredButtons) {
  button.addEventListener('click', handleUserInput);
  buttonColours.push(button.id);
};
const startButton = document.querySelector('#start').addEventListener('click', startGame);
const gameSequence = [];
const userSequence = [];
let level = 1;
let userTurn;

function computerGo() {
  userTurn = false;
  addToGameSequence();
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
}

function addToGameSequence() {
  const randomNumber = Math.floor(Math.random() * colouredButtons.length);
  gameSequence.push(buttonColours[randomNumber]);
  renderFlashes();
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
