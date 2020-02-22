console.log("HELLO KILO PLATOON!")
// Your function(s) should go here that will interact with the webpage or DOM

let answer = Math.floor(Math.random() * 100);


tableArea = document.getElementsByClassName('my-links')[0].hidden = true;


directions = document.getElementsByClassName('game-directions')[0];
actions = document.getElementsByClassName('action-area')[0];
tableArea = document.getElementsByClassName('previous-guesses')[0];
playButtonArea = document.getElementsByClassName('play-button')[0];

let gameHome = () => {
  actions.hidden = true;
  tableArea.hidden = true;
  directions.hidden = true;
  playButtonArea.hidden = false;
}

let count = 0;
let countTwo = 0;
let oldGuesses = [];

let isSolved = () => {
  let lastGuess = document.getElementsByClassName('guess-input')[0].value;
  if (lastGuess) {
    if (lastGuess == answer) {
      document.getElementsByClassName('game-directions')[0].innerText = "You win!!"
      console.log("Solved!");
      window.alert('You won!');
      gameHome();
    } else if (lastGuess > answer) {
      console.log("To high!  Guess a lower number.");
      document.getElementsByClassName('game-directions')[0].innerText = 'To high!  Guess a lower number.';
    } else {
      console.log("To low!  Guess again.");
      document.getElementsByClassName('game-directions')[0].innerText = 'To low!  Guess again.'
    }
    let newCell = document.getElementsByClassName('last-guesses')[0];
    if (count > 7) {
      newCell[1].inserRow()
      document.getElementsByClassName('last-guesses')[1].rows[countTwo].innerText = lastGuess;
      countTwo++;
    } else {
      newCell.insertRow(count)
      document.getElementsByClassName('last-guesses')[0].rows[count].innerText = lastGuess;
      count++;
    }
  }
  document.getElementsByClassName('guess-input')[0].value = null
  document.getElementsByClassName('guess-input')[0].focus();
}

let playGame = () => {
  console.log("play game!")
  directions.hidden = false;
  actions.hidden = false;
  tableArea.hidden = false;
  playButtonArea.hidden = true;
  document.getElementsByClassName('guess-input')[0].value = null
  document.getElementsByClassName('guess-input')[0].focus();
}

let giveUp = () => {
  window.alert('The answer is: ' + answer);
  gameHome();
}


console.log(answer);
gameHome();

// enter listener
document.getElementsByClassName('guess-input')[0].addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementsByClassName("submit-button")[0].click();
  }
});

