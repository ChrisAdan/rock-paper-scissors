const NUMROUNDS = 7;
const CHOICES = ["Rock", "Paper", "Scissors"];
let playerName;
let playerScore;
let computerScore;
let currentRound;
let statistics;
let gameCount = 1;
document.addEventListener("DOMContentLoaded", initializeGame);

// Button to start game
const playButton = document.querySelector("#start-game");
playButton.addEventListener("click", () => {
  resetCommonGameElements();
  ensurePlayerName();
});

let playRound = (selection) => {
  // console.log("called playRound");
  ensurePlayerName();
  const scoreCounters = document.querySelectorAll(`[class*='-score-counter']`);
  scoreCounters.forEach((scoreCounter) => {
    fadeIn(scoreCounter);
  });
  const roundInputs = generateRoundInputs(selection.target);
  const roundWinner = getRoundWinner(roundInputs);
  updateRoundCounter();
  if (roundWinner) {
    updateScoreCounter(roundWinner);
  }
  generateRoundReport(roundWinner, roundInputs);
  // Function for appending row to Move History table
  appendRoundRecordToHistory(roundWinner, roundInputs);
  currentRound += 1;
  if (currentRound > NUMROUNDS) {
    selection.target.removeEventListener("click", playRound);
    cleanup();
  }
};

// Button to Toggle History display
const historyButton = document.querySelector("#toggle-history");
historyButton.addEventListener("click", () => {
  const moveHistoryContainer = document.querySelector(
    ".analytics-card#move-history-container"
  );
  const statsContainers = document.querySelectorAll(
    '[id*="-history-container"]'
  );
  statsContainers.forEach((container) => {
    toggleVisibility(container);
  });
  if (moveHistoryContainer.classList.contains("fadein")) {
    historyButton.textContent = historyButton.textContent.replace(
      "Show",
      "Hide"
    );
  } else {
    historyButton.textContent = historyButton.textContent.replace(
      "Hide",
      "Show"
    );
  }
});

function createNewScoreData() {
  const stats = {
    player: {
      rock: {
        win: 0,
        loss: 0,
      },
      paper: {
        win: 0,
        loss: 0,
      },
      scissors: {
        win: 0,
        loss: 0,
      },
    },
    ai: {
      rock: {
        win: 0,
        loss: 0,
      },
      paper: {
        win: 0,
        loss: 0,
      },
      scissors: {
        win: 0,
        loss: 0,
      },
    },
  };
  return stats;
}
function initializeGame() {
  resetCommonGameElements();
  hideGameElements();
  const hiddenUI = hideUI();
  const cards = document.querySelectorAll(".weapon");
  cards.forEach((selection) => {
    selection.addEventListener("click", playRound);
  });
  setupPlayButton(hiddenUI);
  greetPlayer();
}
function resetCommonGameElements() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  statistics = createNewScoreData();
  updateRoundCounter();
  updateScoreCounter("player");
  updateScoreCounter("ai");
  clearRoundReport();
  initializeMoveHistory();
  initializeStatistics();
}
function hideUI() {
  const elements = [];
  const navmenu = document.querySelector(".navmenu");
  elements.push(navmenu);
  const weaponRow = document.querySelector(".weapon-row");
  elements.push(weaponRow);
  const headline = document.querySelector(".headline");
  elements.push(headline);
  elements.forEach((element) => {
    hideElement(element);
  });
  return elements;
}
function setupPlayButton(ui) {
  const startGameButton = document.querySelector(".start-game-button");
  if (gameCount === 1) {
    startGameButton.textContent = "Care to try...?";
  } else {
    startGameButton.textContent = "Another round...?";
  }
  startGameButton.addEventListener("click", () => {
    revealInterface(startGameButton, ui);
    const welcomeText = document.querySelector(".welcome-screen h1");
    hideElement(welcomeText);
  });
}
function revealInterface(button, ui) {
  hideElement(button);
  ui.forEach((element) => {
    if (element.classList.contains("weapon-row")) {
      setTimeout(() => {
        fadeIn(element);
      }, 1000);
    } else if (element.classList.contains("headline")) {
      setTimeout(() => {
        fadeIn(element);
      }, 1500);
    } else {
      fadeIn(element);
    }
  });
}
function greetPlayer() {
  const greeting = document.querySelector(".welcome-screen h1");
  if (gameCount === 1) {
    greeting.textContent = "There is power in reason";
  } else {
    greeting.textContent = "So you're back again";
  }
  fadeIn(greeting);
  const startButton = document.querySelector(".start-game-button");
  fadeIn(startButton);
}
function cleanup() {
  const elements = [];
  elements.push(document.querySelector(".round-report"));
  elements.push(document.querySelector(".weapon-row"));
  elements.push(document.querySelector(".headline"));
  elements.forEach((element) => {
    fadeOut(element);
  });
  const analytics = document.querySelector(".analytics");
  const scoreCounters = document.querySelector(".score-counters");
  setTimeout(() => {
    scoreCounters.parentNode.insertBefore(analytics, scoreCounters);
    document.querySelectorAll(".analytics-card").forEach((card) => {
      fadeIn(card);
    });
  }, 2000);
  sayGoodbye();
}
function sayGoodbye() {
  gameCount += 1;
  const goodbyeText = document.querySelector(".goodbye-text");
  const winStatement =
    playerScore > computerScore
      ? "won this time"
      : playerScore < computerScore
      ? "couldn't quite find your way"
      : "met your match today";
  const playAgain = document.createElement("button");
  playAgain.textContent = "Once more?";
  hideElement(playAgain);
  playAgain.setAttribute("id", "replay-button");
  playAgain.addEventListener("click", () => {
    fadeOut(goodbyeText);
    fadeOut(playAgain);
    setTimeout(() => {
      const goodbye = document.querySelector(".goodbye");
      const analytics = document.querySelector(".analytics");
      goodbye.parentNode.insertBefore(analytics, goodbye);
      initializeGame();
    }, 750);
  });
  setTimeout(() => {
    goodbyeText.textContent = `Thanks for dropping by, ${playerName}. Looks like you ${winStatement}.`;
    fadeIn(goodbyeText);
    setTimeout(() => {
      goodbyeText.parentNode.appendChild(playAgain);
      fadeIn(playAgain);
    }, 1000);
  }, 2000);
}

function fadeIn(element) {
  showElement(element);
  if (element.classList.contains("fadeout")) {
    element.classList.replace("fadeout", "fadein");
  } else {
    element.classList.add("fadein");
  }
}

function fadeOut(element) {
  if (element.classList.contains("fadein")) {
    element.classList.replace("fadein", "fadeout");
  } else {
    element.classList.add("fadeout");
  }
  setTimeout(() => {
    hideElement(element);
  }, 2000);
}

function toggleVisibility(element) {
  if (isHidden(element)) {
    fadeIn(element);
  } else {
    fadeOut(element);
  }
}
function showElement(element) {
  element.classList.remove("hide");
}
function hideElement(element) {
  element.classList.add("hide");
}
function ensurePlayerName() {
  if (!playerName) {
    playerName = getPlayerName();
  }
  setupPlayer(playerName);
}
function getPlayerName() {
  const playerName = prompt("Enter a Name for your Player");
  return playerName || "unknown stranger";
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
function getComputerChoice() {
  let randomSelection = Math.floor(Math.random() * 100) % 3;
  let computerChoice = CHOICES[randomSelection];
  return computerChoice;
}
function getRoundWinner(choices) {
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
function updateScoreCounter(winner) {
  const winnerScoreDisplay = document.querySelector(".".concat(winner));
  if (winner === "player") {
    winnerScoreDisplay.textContent = playerScore;
  } else if (winner === "ai") {
    winnerScoreDisplay.textContent = computerScore;
  } else {
    throw new TypeError(`Invalid input ${winner}`);
  }
  fadeIn(winnerScoreDisplay);
}
function appendRoundRecordToHistory(roundWinner, roundInputs) {
  const trackerTable = document.querySelector("#move-history-table");
  const roundRecord = generateNewRoundRecord(roundWinner, roundInputs);
  fadeIn(roundRecord);
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
function generateRoundReport(winner, choices) {
  const roundReportElement = document.querySelector(".round-report");
  fadeOut(roundReportElement);
  setTimeout(() => {
    if (winner === "player") {
      roundReportElement.textContent = `${playerName} wins, ${choices.playerChoice} beats ${choices.computerChoice}`;
      updateStatistics(winner, choices.playerChoice, choices.computerChoice);
    } else if (winner === "ai") {
      roundReportElement.textContent = `AI wins, ${choices.computerChoice} beats ${choices.playerChoice}`;
      updateStatistics(winner, choices.computerChoice, choices.playerChoice);
    } else if (!winner) {
      roundReportElement.textContent = `It's a tie! Both sides chose ${
        choices.playerChoice || choices.computerChoice
      }`;
    }
    // toggleVisibility(roundReportElement);
    fadeIn(roundReportElement);
  }, 2000);
  const historyButton = document.querySelector("#toggle-history");
  if (isHidden(historyButton)) {
    fadeIn(historyButton);
  }
  const roundCounter = document.querySelector(".round-counter-container");
  if (isHidden(roundCounter)) {
    setTimeout(() => {
      fadeIn(roundCounter);
    }, 750);
  }
}
function updateStatistics(winner, winChoice, loseChoice) {
  const loser = winner === "player" ? "ai" : "player";
  const winRecord = document.querySelector(
    `#${winChoice.toLowerCase()}-${winner}-win`
  );
  statistics[winner][winChoice.toLowerCase()]["win"] += 1;
  winRecord.textContent = statistics[winner][winChoice.toLowerCase()]["win"];
  const winRate = document.querySelector(
    `#${winChoice.toLowerCase()}-win-rate`
  );
  winRate.textContent = calculateRate(winChoice, "win");
  const lossRecord = document.querySelector(
    `#${loseChoice.toLowerCase()}-${loser}-loss`
  );
  statistics[loser][loseChoice.toLowerCase()]["loss"] += 1;
  lossRecord.textContent = statistics[loser][loseChoice.toLowerCase()]["loss"];
  const lossRate = document.querySelector(
    `#${loseChoice.toLowerCase()}-loss-rate`
  );
  lossRate.textContent = calculateRate(loseChoice, "loss");
}
function clearRoundReport() {
  const roundReportElement = document.querySelector(".round-report");
  roundReportElement.textContent = "";
}
function initializeMoveHistory() {
  // Get reference to div where table will live
  const tableDiv = document.querySelector("#move-history");
  // Function to create and return Table element
  const trackerTable = createTrackerTable();
  tableDiv.appendChild(trackerTable);
}
function initializeStatistics() {
  const types = ["win", "loss"];
  types.forEach((type) => {
    const tableDiv = document.querySelector(`#${type}-history`);
    const newTable = createStatsTable(type);
    tableDiv.appendChild(newTable);
  });
}
function createTrackerTable() {
  eraseExistingTable("#move-history-table");
  const trackerTable = document.createElement("table");
  // Function to create and return table headers
  const trackerTableHead = createTableHeaders();
  trackerTable.appendChild(trackerTableHead);
  trackerTable.setAttribute("id", "move-history-table");
  return trackerTable;
}
function eraseExistingTable(selector) {
  const existingTable = document.querySelector(selector);
  if (existingTable) {
    existingTable.remove();
  }
}
function createTableHeaders() {
  const trackerTableHead = document.createElement("thead");
  const headers = ["Round No.", "Selection", "Winner", "Score"];
  // for each header, create col element and append to parent thead
  headers.forEach((header) => {
    let newCol;
    if (["Selection", "Score"].includes(header)) {
      newCol = document.createElement("colgroup");
      newCol.setAttribute("span", "2");
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
function createStatsTable(type) {
  eraseExistingTable(`#${type}-history-table`);
  const newTable = document.createElement("table");
  // Function to create and return table headers
  const newTableHeaders = createStatsTableHeaders(type);
  newTable.appendChild(newTableHeaders);
  const newTableBody = createStatsTableBody(type);
  newTable.appendChild(newTableBody);
  newTable.setAttribute("id", `${type}-history-table`);
  return newTable;
}
function createStatsTableHeaders(type) {
  const newTableHead = document.createElement("thead");
  const headers = [
    "Selection",
    `${toTitleCase(type)} Count`,
    `Player ${toTitleCase(type)} Rate (%)`,
  ];
  // For each header, create col element and append to parent thead
  headers.forEach((header) => {
    let newCol;
    if (["Selection"].includes(header)) {
      newCol = document.createElement("colgroup");
      newCol.setAttribute("span", "2");
    } else {
      newCol = document.createElement("col");
    }
    newTableHead.appendChild(newCol);
  });

  // create TR 1 - top level headers
  const headerRow = createStatsTableHeaderRow(type, headers);
  newTableHead.appendChild(headerRow);

  // create TR 2 - top level headers
  const subHeaderRow = createStatsTableSubHeaders();
  newTableHead.appendChild(subHeaderRow);
  return newTableHead;
}
function createStatsTableHeaderRow(type, headers) {
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    let newCol = document.createElement("th");
    if ([`${toTitleCase(type)} Count`].includes(header)) {
      newCol.setAttribute("colspan", "2");
    } else {
      newCol.setAttribute("rowspan", "2");
    }
    newCol.setAttribute("scope", "col");
    newCol.textContent = toTitleCase(header);
    headerRow.appendChild(newCol);
  });
  return headerRow;
}
function createStatsTableSubHeaders() {
  const subHeaderRow = document.createElement("tr");
  const subHeaders = ["Player", "AI"];
  subHeaders.forEach((subHeader) => {
    newCol = document.createElement("th");
    newCol.setAttribute("scope", "col");
    newCol.textContent = subHeader;
    subHeaderRow.appendChild(newCol);
  });
  return subHeaderRow;
}
function createStatsTableBody(type) {
  const newBody = document.createElement("tbody");
  CHOICES.forEach((choice) => {
    const newRow = document.createElement("tr");
    const selection = document.createElement("th");
    selection.setAttribute("scope", "row");
    selection.textContent = choice;
    newRow.appendChild(selection);
    const players = ["player", "ai"];
    players.forEach((player) => {
      const statistic = document.createElement("td");
      statistic.textContent = statistics[player][choice.toLowerCase()][type];
      statistic.setAttribute("id", `${choice.toLowerCase()}-${player}-${type}`);
      newRow.appendChild(statistic);
    });
    const rate = document.createElement("td");
    const percentage = Math.round(
      (statistics["player"][choice.toLowerCase()][type] /
        (statistics["player"][choice.toLowerCase()][type] +
          statistics["ai"][choice.toLowerCase()][type])) *
        100
    );
    rate.textContent = percentage || 0;
    rate.setAttribute("id", `${choice.toLowerCase()}-${type}-rate`);
    newRow.appendChild(rate);
    newBody.appendChild(newRow);
  });
  return newBody;
}

function calculateRate(choice, type) {
  let newRate;
  newRate = Math.round(
    (statistics["player"][choice.toLowerCase()][type] /
      (statistics["player"][choice.toLowerCase()][type] +
        statistics["ai"][choice.toLowerCase()][type])) *
      100
  );
  return newRate;
}
function hideGameElements() {
  const elements = [];
  const roundCounter = document.querySelector(".round-counter-container");
  elements.push(roundCounter);
  const roundReport = document.querySelector(".round-report");
  elements.push(roundReport);
  const tableContainer = document.querySelector("#move-history-container");
  elements.push(tableContainer);
  const winStatsContainer = document.querySelector(
    ".analytics-card#win-history-container"
  );
  elements.push(winStatsContainer);
  const lossStatsContainer = document.querySelector(
    ".analytics-card#loss-history-container"
  );
  elements.push(lossStatsContainer);
  const scoreCounters = document.querySelectorAll("[class*= '-score-counter']");
  scoreCounters.forEach((scoreCounter) => {
    elements.push(scoreCounter);
  });
  elements.forEach((element) => {
    hideElement(element);
  });
  return elements;
}

function isHidden(element) {
  return element.classList.contains("hide");
}
function toTitleCase(string) {
  if (string == "ai") {
    return string.toUpperCase();
  } else {
    return string.at(0).toUpperCase().concat(string.slice(1).toLowerCase());
  }
}
