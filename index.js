const NUMROUNDS = 5;
const CHOICES = ["Rock", "Paper", "Scissors"];

// Introduction
console.log("Welcome to Rock Paper Scissors");
console.log("Rock beats Scissors");
console.log("Scissors beats Paper");
console.log("Paper beats Rock");
console.log(
  `You will play ${NUMROUNDS} rounds. Whoever has the most wins at the end is the winner!`
);
console.log("May the odds be ever in your favor");

// Get computer choice among Rock, Paper, Scissors
function getComputerChoice() {
  // Store possible outcomes in an array;
  let randomSelection = Math.floor(Math.random() * 100) % 3;
  // Generate a random number with 3 outcomes
  let computerChoice = CHOICES[randomSelection];
  // Create a string variable and store the value rock/paper/scissors based on random number
  console.log(`Computer chose ${computerChoice}`);
  return computerChoice;
}

// Get human choice
function getHumanChoice() {
  // Ask user to input a choice
  // Repeat until choice is valid
  // Validate the choice
  // Is choice a string?
  // catch TypeError
  // Is choice 'rock', 'paper', or 'scissors'?
  // catch TypeError
  // If choice is valid, create a new string variable and store the user choice
  // return the user choice
  let humanChoice;
  do {
    humanChoice = prompt("Rock, Paper, Scissors?");
  } while (!isValidHumanChoice(humanChoice));
}

function isValidHumanChoice(choice) {
  if (
    !choice ||
    !CHOICES.find((str) => str.toLowerCase() === choice.toLowerCase())
  ) {
    console.log("Please input a valid choice (rock, paper, or scissors)");
    return false;
  } else {
    console.log(`Human chose ${choice}`);
    return true;
  }
}
// Declare players score variables

// Play a round

// Play entire game (5 rounds)
