const NUMROUNDS = 1;
const CHOICES = ["Rock", "Paper", "Scissors"];
let playerScore;
let computerScore;
let currentRound;

//  Game logic
function getComputerChoice() {
  let randomSelection = Math.floor(Math.random() * 100) % 3;
  let computerChoice = CHOICES[randomSelection];
  return computerChoice;
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    // Tie
    return false;
  } else if (isWinner(playerChoice, computerChoice)) {
    // player wins
    playerScore += 1;
    return "player";
  } else if (isWinner(computerChoice, playerChoice)) {
    // Computer Wins
    computerScore += 1;
    return "ai";
  } else {
    throw new TypeError(
      `Invalid choice argument: player (${playerChoice}) | ai (${computerChoice})`
    );
  }
}

function isWinner(a, b) {
  if (a === "Rock" && b === "Scissors") {
    return true;
  } else if (a === "Paper" && b === "Rock") {
    return true;
  } else if (a === "Scissors" && b === "Paper") {
    return true;
  } else {
    return false;
  }
}

// DOM Manipulation

document.addEventListener("DOMContentLoaded", setup);

function setup() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 0;
  updateRoundCounter();
  updateScore("player");
  updateScore("ai");
}
// Click to start game
const playButton = document.querySelector("#start-game");
playButton.addEventListener("click", setup);

// Click card to play round
const cards = document.querySelectorAll(".weapon");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    let computerChoice = getComputerChoice();
    let playerChoice = card.getAttribute("id");
    playerChoice = playerChoice
      .at(0)
      .toUpperCase()
      .concat(playerChoice.slice(1).toLowerCase());
    const roundWinner = playRound(playerChoice, computerChoice);
    updateRoundCounter();
    if (roundWinner) {
      updateScore(roundWinner);
    }
    currentRound += 1;
  });
});

function updateRoundCounter() {
  const roundCounter = document.querySelector(".round-counter");
  roundCounter.textContent = currentRound;
}

function updateScore(winner) {
  const winnerScoreDisplay = document.querySelector(".".concat(winner));
  if (winner === "player") {
    winnerScoreDisplay.textContent = playerScore;
  } else if (winner === "ai") {
    winnerScoreDisplay.textContent = computerScore;
  } else {
    throw new TypeError(`Invalid input ${winner}`);
  }
}

function generateRoundReport(roundWinner) {
  // You lose! Paper beats rock
}
