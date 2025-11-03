const board = document.getElementById("board");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

for (let i=0; i<9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.setAttribute("data-index", i);
  cell.onclick = handleCellClick;
  board.appendChild(cell);
}

if (document.querySelector('input[name="mode"][value="bot"]').checked) {
  botLevelSelect.disabled = true;
}


function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (checkDraw()) {
    alert("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]         
  ];

  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function updateLocalTime() {
  const options = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
  const formatter = new Intl.DateTimeFormat([], options);
  const timeString = formatter.format(new Date());
  document.getElementById("localTime").textContent = `India Time: ${timeString}`;
}
setInterval(updateLocalTime, 1000);
updateLocalTime();


function checkDraw() {
  return gameState.every(cell => cell !== "");
}

const modeRadios = document.querySelectorAll('input[name="mode"]');
const botLevelSelect = document.getElementById("botLevel");


if (document.querySelector('input[name="mode"][value="bot"]').checked) {
  botLevelSelect.disabled = false;
}

modeRadios.forEach(radio => {
  radio.addEventListener("change", function(e) {
    botLevelSelect.disabled = e.target.value !== "bot";

  });
});



function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}
