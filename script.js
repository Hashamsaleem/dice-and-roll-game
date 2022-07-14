// select elements
const scoreE0 = document.getElementById("score--0");
const scoreE1 = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScoreEl0 = document.getElementById("current--0");
const currentScoreEl1 = document.getElementById("current--1");
const player1 = document.querySelector(".player--0 ");
const player2 = document.querySelector(".player--1 ");

let score, playing, currentScore, activePlayer;
reset();
// scores
//let score;

// set value
scoreE0.textContent = 0;
scoreE1.textContent = 0;

//playing
//let playing = true;

// current score
//let currentScore = 0;

// active player
//let activePlayer = 0;

// add hidden class to dice class
diceEl.classList.add("hidden");

// swtich player function
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// checkResult
const checkResult = function (message) {
  document.querySelector(`#result${activePlayer}`).textContent = message;
  document.querySelector(`#result${activePlayer}`).style.fontSize = "3rem";
};

// add class
const addClass = function (e) {
  document.querySelector(`.player--${activePlayer}`).classList.add(e);
};

// dice roll funcationality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // generate random number
    let dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove("hidden");

    // display dice number on screen
    diceEl.src = `./assest/images/dice-${dice}.png`;

    // current player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// New button functionality
function reset() {
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  score = [0, 0];
  scoreE0.textContent = 0;
  scoreE1.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--loser");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--loser");
}
// hold button funcationality
btnHold.addEventListener("click", function () {
  if (playing) {
    // add current score to the active playern score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // winner and loser
    if (score[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add("hidden");
      document;
      addClass("player--winner");
      checkResult("winner");
      activePlayer = activePlayer === 0 ? 1 : 0;
      checkResult("losser");
      addClass("player--loser");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", reset);
