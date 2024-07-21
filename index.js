const NUMROUNDS = 1;
const CHOICES = ["Rock", "Paper", "Scissors"];
let playerName;
let playerScore;
let computerScore;
let currentRound;
// let winHistory;

document.addEventListener("DOMContentLoaded", initializeGame);

// Button to start game
const playButton = document.querySelector("#start-game");
playButton.addEventListener("click", () => {
  resetCommonGameElements();
  ensurePlayerName();
});

// Click card to play round
const cards = document.querySelectorAll(".weapon");
cards.forEach((selection) => {
  selection.addEventListener("click", () => {
    ensurePlayerName();
    const roundInputs = generateRoundInputs(selection);
    const roundWinner = playRound(roundInputs);
    console.log(roundInputs);
    updateRoundCounter();
    if (roundWinner) {
      updateScore(roundWinner);
    }
    generateRoundReport(roundWinner, roundInputs);
    // Function for appending row to Move History table
    appendRoundRecordToHistory(roundWinner, roundInputs);
    currentRound += 1;
  });
});

function appendRoundRecordToHistory(roundWinner, roundInputs) {
  const trackerTable = document.querySelector("#move-history-table");
  const roundRecord = generateNewRoundRecord(roundWinner, roundInputs);
  trackerTable.appendChild(roundRecord);
}
function generateNewRoundRecord(roundWinner, roundInputs) {
  const recordRow = document.createElement("tr");
  const record = {};
  record.round = currentRound;
  record.playerChoice = roundInputs.playerChoice;
  record.computerChoice = roundInputs.computerChoice;
  record.winner = roundWinner;
  record.playerScore = playerScore;
  record.computerScore = computerScore;

  for (const [key, value] of Object.entries(record)) {
    let rowData;
    if (key === "round") {
      rowData = document.createElement("th");
    } else {
      rowData = document.createElement("td");
    }
    if (key === "winner") {
      if (!value) {
        rowData.textContent = "Tie";
      } else {
        rowData.textContent = toTitleCase(value);
      }
    } else {
      rowData.textContent = value;
    }
    recordRow.appendChild(rowData);
  }
  return recordRow;
}
// Button to Toggle History display
const historyButton = document.querySelector("#toggle-history");
historyButton.addEventListener("click", () => {
  const moveHistoryContainer = document.querySelector(
    ".analytics-card#move-history-container"
  );
  toggleVisibility(moveHistoryContainer);
  if (moveHistoryContainer.classList.contains("hide")) {
    historyButton.textContent = historyButton.textContent.replace(
      "Hide",
      "Show"
    );
  } else {
    historyButton.textContent = historyButton.textContent.replace(
      "Show",
      "Hide"
    );
  }
});

function initializeGame() {
  resetCommonGameElements();
  hideHiddenElements();
}

function resetCommonGameElements() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  updateRoundCounter();
  updateScore("player");
  updateScore("ai");
  clearRoundReport();
  createMoveHistory();
}
function ensurePlayerName() {
  if (!playerName) {
    playerName = getPlayerName();
  }
  setupPlayer(playerName);
}
function getPlayerName() {
  const playerName = prompt("Enter a Name for your Player");
  return playerName;
}
function setupPlayer(name) {
  const playerNameElement = document.querySelector(".player-name");
  playerNameElement.textContent = name;
}
function generateRoundInputs(selection) {
  let roundInputs = {};
  let currentChoice = selection.getAttribute("id");
  currentChoice = toTitleCase(currentChoice);
  roundInputs.playerChoice = currentChoice;
  roundInputs.computerChoice = getComputerChoice();
  return roundInputs;
}

function toTitleCase(string) {
  if (string == "ai") {
    return string.toUpperCase();
  } else {
    return string.at(0).toUpperCase().concat(string.slice(1).toLowerCase());
  }
}
function getComputerChoice() {
  let randomSelection = Math.floor(Math.random() * 100) % 3;
  let computerChoice = CHOICES[randomSelection];
  return computerChoice;
}
function playRound(choices) {
  if (choices.playerChoice === choices.computerChoice) {
    // Tie
    return false;
  } else if (isWinner(choices.playerChoice, choices.computerChoice)) {
    // player wins
    playerScore += 1;
    return "player";
  } else if (isWinner(choices.computerChoice, choices.playerChoice)) {
    // Computer Wins
    computerScore += 1;
    return "ai";
  } else {
    throw new TypeError(
      `Invalid choice argument: player (${choices.playerChoice}) | ai (${choices.computerChoice})`
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
function createMoveHistory() {
  // Get reference to div where table will live
  const tableDiv = document.querySelector("#move-history");
  // Function to create and return Table element
  const trackerTable = constructTrackerTable();
  tableDiv.appendChild(trackerTable);
}
function constructTrackerTable() {
  eraseExistingTable();
  const trackerTable = document.createElement("table");
  // Function to create and return table headers
  const trackerTableHead = constructTableHeaders();
  trackerTable.appendChild(trackerTableHead);
  trackerTable.setAttribute("id", "move-history-table");
  return trackerTable;
}
function eraseExistingTable() {
  const existingTable = document.querySelector("#move-history-table");
  if (existingTable) {
    existingTable.remove();
  }
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

function hideHiddenElements() {
  const elements = [];
  const tableContainer = document.querySelector("#move-history-container");
  elements.push(tableContainer);
  elements.forEach((element) => {
    hideElement(element);
  });
}

function showElement(element) {
  element.classList.remove("hide");
}
function hideElement(element) {
  element.classList.add("hide");
}

function toggleVisibility(element) {
  if (element.classList.contains("hide")) {
    showElement(element);
  } else {
    hideElement(element);
  }
}
