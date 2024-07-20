const NUMROUNDS = 1;
const CHOICES = ["Rock", "Paper", "Scissors"];
let humanScore = 0;
let computerScore = 0;
let currentRound = 1;

//  Game logic
function getComputerChoice() {
  let randomSelection = Math.floor(Math.random() * 100) % 3;
  let computerChoice = CHOICES[randomSelection];
  return computerChoice;
}

function getHumanChoice() {
  let humanChoice;
  do {
    humanChoice = prompt("Rock, Paper, Scissors?");
  } while (humanChoice && !isValidHumanChoice(humanChoice));
  //   I want to reformat the string to Title case
  return humanChoice.at(0).toUpperCase().concat(humanChoice.slice(1));
}

function isValidHumanChoice(currentChoice) {
  if (!currentChoice) {
    console.log("Exiting program");
  } else if (
    !CHOICES.find(
      (testChoice) => testChoice.toLowerCase() === currentChoice.toLowerCase()
    )
  ) {
    console.log("Please input a valid choice (rock, paper, or scissors)");
    return false;
  } else {
    return true;
  }
}
function playRound(humanChoice, computerChoice) {
  let round = `Round ${currentRound}`;
  // I think inline grouping looks nice
  console.group(round);
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
    throw new TypeError(
      `Invalid choice argument: human (${humanChoice}) | ai (${computerChoice})`
    );
  }

  console.log(
    `The score is now: Player: ${humanScore} | Computer: ${computerScore}`
  );
  console.groupEnd(round);
  currentRound++;
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
// function playGame() {
//   while (currentRound <= NUMROUNDS) {
//     let computerChoice = getComputerChoice();
//     let humanChoice = getHumanChoice();
//     playRound(humanChoice, computerChoice);
//   }
//   announceWinner();
// }

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
    : // Should not be reachable
      console.log("Seriously, how did we get here?");
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
// DOM Manipulation

const cards = document.querySelectorAll(".weapon");
cards.forEach((card) => {
  let playerChoice = card.getAttribute("id");
  playerChoice = playerChoice
    .at(0)
    .toUpperCase()
    .concat(playerChoice.slice(1).toLowerCase());
  card.addEventListener("click", () => {
    playRound(playerChoice, getComputerChoice());
  });
});
