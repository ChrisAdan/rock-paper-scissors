const NUMROUNDS = 5;
const CHOICES = ["Rock", "Paper", "Scissors"];
let humanScore = 0;
let computerScore = 0;
let currentRound = 1;

// Get computer choice among Rock, Paper, Scissors
function getComputerChoice() {
  // Store possible outcomes in an array;
  let randomSelection = Math.floor(Math.random() * 100) % 3;
  // Generate a random number with 3 outcomes
  let computerChoice = CHOICES[randomSelection];
  // Create a string variable and store the value rock/paper/scissors based on random number
  //   console.log(`Computer chose ${computerChoice}`);
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
  } while (humanChoice && !isValidHumanChoice(humanChoice));
  return humanChoice.at(0).toUpperCase().concat(humanChoice.slice(1));
}

function isValidHumanChoice(choice) {
  if (!choice) {
    console.log("Exiting program");
  } else if (
    !CHOICES.find((str) => str.toLowerCase() === choice.toLowerCase())
  ) {
    console.log("Please input a valid choice (rock, paper, or scissors)");
    return false;
  } else {
    // console.log(`Human chose ${choice}`);
    return true;
  }
}
// Play a round
function playRound(humanChoice, computerChoice) {
  // Announce round number
  let round = `Round ${currentRound}`;
  console.group(round);
  //   console.log(`Round ${currentRound}`);
  // Compare human and computer choice
  // if human and computer choices are same - tie
  // Strategy: if not tie, check 3 winning cases for an a->b relationship, if no win, check the other way around
  // log winner in console or announce tie
  // increment winner's score
  if (humanChoice === computerChoice) {
    // Tie
    console.log(`It's a tie! You both chose ${humanChoice || computerChoice}`);
  } else if (isWinner(humanChoice, computerChoice)) {
    // Human wins
    humanScore++;
    console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
  } else if (isWinner(computerChoice, humanChoice)) {
    // Computer Wins
    computerScore++;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
  } else {
    throw new TypeError("How did we get here?");
  }
  //   Report current scores
  console.log(
    `The score is now: Player: ${humanScore} | Computer: ${computerScore}`
  );
  console.groupEnd(round);
  // increment round number
  currentRound++;
}

function isWinner(a, b) {
  // Six cases:
  // If human = rock and computer = scissors - human wins
  // if human = rock and computer = paper - computer wins
  // if human = paper and computer = rock - human wins
  // if human = paper and computer = scissors - computer wins
  // if human = scissors and computer = paper - human wins
  // if human = scissors and computer = rock - computer wins
  // 3 subcases
  // if a = rock and b = scissors, return a
  if (a === "Rock" && b === "Scissors") {
    return true;
    // if a = paper and b = rock, return a
  } else if (a === "Paper" && b === "Rock") {
    return true;
    // if a = scissors and b = paper, return a
  } else if (a === "Scissors" && b === "Paper") {
    return true;
  } else {
    return false;
  }
}

function playGame() {
  while (currentRound <= NUMROUNDS) {
    let computerChoice = getComputerChoice();
    let humanChoice = getHumanChoice();
    playRound(humanChoice, computerChoice);
  }
  announceWinner();
}

function announceWinner() {
  console.group(`Game Summary`);
  console.log(
    `Gamer over! Final Scores: Player: ${humanScore} | Computer: ${computerScore}`
  );
  humanScore === computerScore
    ? console.log(`It's a tie!`)
    : humanScore > computerScore
    ? console.log(`You win! Great work.`)
    : humanScore < computerScore
    ? console.log(`You lose :( big sad.`)
    : console.log("Seriously, how did we get here?");
  console.groupEnd(`Game Summary`);
}

function runProgram() {
  let continueGame = true;
  showIntroduction();
  do {
    playGame();
    let selection = prompt("Play again? Y/N");
    if (!selection || selection.toLowerCase() === "n") {
      continueGame = false;
    } else {
      console.log("Starting new game");
      currentRound = 1;
      humanScore = 0;
      computerScore = 0;
    }
  } while (continueGame);
  console.log("Thanks for playing! Goodbye.");
}

function showIntroduction() {
  console.log(
    `You will play ${NUMROUNDS} rounds. Whoever has the most wins at the end is the winner!`
  );
  console.log("May the odds be ever in your favor");
}

const run = document.getElementById("start-game");

run.addEventListener("click", () => runProgram());
