const NUMROUNDS = 1;
const CHOICES = ["Rock", "Paper", "Scissors"];
let playerName;
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

document.addEventListener("DOMContentLoaded", setupGame);

function setupGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  updateRoundCounter();
  updateScore("player");
  updateScore("ai");
  clearRoundReport();
  createMoveHistory();
}

function setupPlayer(name) {
  const playerNameElement = document.querySelector(".player-name");
  playerNameElement.textContent = name;
}

// Button to start game
const playButton = document.querySelector("#start-game");
playButton.addEventListener("click", () => {
  setupGame();
  if (!playerName) {
    playerName = prompt("Enter a Name for your Player");
  }
  setupPlayer(playerName);
});

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
    generateRoundReport(roundWinner, { playerChoice, computerChoice });
    currentRound += 1;
  });
});

// Button to Display History
const historyButton = document.querySelector("#toggle-history");
historyButton.addEventListener("click", () => {
  const moveHistoryTable = document.querySelector("#move-history-container");
  moveHistoryTable.classList.toggle("hide");
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

function generateRoundReport(winner, choices) {
  const roundReportElement = document.querySelector(".round-report");
  if (winner === "player") {
    roundReportElement.textContent = `${playerName} wins, ${choices.playerChoice} beats ${choices.computerChoice}`;
  } else if (winner === "ai") {
    roundReportElement.textContent = `AI wins, ${choices.computerChoice} beats ${choices.playerChoice}`;
  } else if (!winner) {
    roundReportElement.textContent = `It's a tie! Both sides chose ${
      choices.playerChoice || choices.computerChoice
    }`;
  }
}

function clearRoundReport() {
  const roundReportElement = document.querySelector(".round-report");
  roundReportElement.textContent = "";
}

// TODO: have move history hidden on startup
function createMoveHistory() {
  // Get reference to div where table will live
  const tableDiv = document.querySelector("#move-history-container");
  // Function to create and return Table element
  const trackerTable = constructTrackerTable();
  tableDiv.appendChild(trackerTable);
}
function constructTrackerTable() {
  const trackerTable = document.createElement("table");
  // Function to create and return table headers
  const trackerTableHead = constructTableHeaders();
  trackerTable.appendChild(trackerTableHead);
  return trackerTable;
}
function constructTableHeaders() {
  const trackerTableHead = document.createElement("thead");
  const headers = ["Round No.", "Selection", "Winner", "Score"];
  // for each header, create col element and append to parent thead
  headers.forEach((header) => {
    let newCol;
    if (["Selection", "Score"].includes(header)) {
      newCol = document.createElement("colgroup");
      newCol.setAttribute("span", 2);
    } else {
      newCol = document.createElement("col");
    }
    trackerTableHead.appendChild(newCol);
  });

  const headerRow = createTableHeaderRow(headers);
  trackerTableHead.appendChild(headerRow);

  const subHeaderRow = createTableSubHeaderRow();
  trackerTableHead.appendChild(subHeaderRow);
  return trackerTableHead;
}
function createTableHeaderRow(headers) {
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    let newCol = document.createElement("th");
    if (["Selection", "Score"].includes(header)) {
      newCol.setAttribute("scope", "colgroup");
      newCol.setAttribute("colspan", "2");
    } else if (["Round No.", "Winner"]) {
      newCol.setAttribute("scope", "col");
      newCol.setAttribute("rowspan", "2");
    }
    newCol.textContent = header;
    headerRow.appendChild(newCol);
  });
  return headerRow;
}
function createTableSubHeaderRow() {
  const headerRow = document.createElement("tr");
  const subHeaders = ["Player", "AI"];
  const rowPairs = ["Selection", "Winner"];
  rowPairs.forEach(() => {
    const newHeaders = createTableSubheadPair(subHeaders);
    console.log(newHeaders);
    newHeaders.map((subHeader) => headerRow.appendChild(subHeader));
  });
  return headerRow;
}

function createTableSubheadPair(subHeaders) {
  let resultElements = [];
  subHeaders.forEach((header) => {
    let newHeader = document.createElement("th");
    newHeader.setAttribute("scope", "col");
    newHeader.textContent = header;
    resultElements.push(newHeader);
  });
  return resultElements;
}
