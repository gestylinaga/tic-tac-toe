// Tic Tac Toe
const cells = document.querySelectorAll(".cell");
const results: any = document.getElementById("results");
const button: any = document.querySelector("button");

// Initial game state
let player = 1; // Player1 = 1, Player2 = -1
let gameOver = false;
let boardState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

function placeMarker(index: number): void {
  // Determines row/column from index of cell
  let col = index % 3;
  let row = (index - col) / 3;

  // If cell is empty & game is still running
  if (boardState[row][col] === 0 && !gameOver) {
    boardState[row][col] = player;

    player *= -1;     // Switch active player
    drawMarkers();    // Update board display
    checkGameState(); // Check for win state
    updateCurrent();
  }
}

function updateCurrent(): void {
  const current: any = document.getElementById("current-player");

  current.classList.toggle("X");
  current.classList.toggle("O");
}

function drawMarkers(): void {
  // Iterate over rows
  for (let row = 0; row < 3; row++) {
    // Iterate over columns
    for (let col = 0; col < 3; col++) {
      if (boardState[row][col] === 1) {
        cells[(row * 3) + col].classList.add("X");
      } else if (boardState[row][col] === -1) {
        cells[(row * 3) + col].classList.add("O");
      }
    }
  }
}

function checkGameState(): void {
  // Check rows/columns for winner
  for (let i = 0; i < 3; i++) {
    let rowSum = boardState[i][0] + boardState[i][1] + boardState[i][2];
    let colSum = boardState[0][i] + boardState[1][i] + boardState[2][i];
    if (rowSum === 3 || colSum === 3) {
      endGame(1);
    } else if ( rowSum === -3 || colSum === -3) {
      endGame(2);
    }
  }

  // Check diagonals for winner
  let diagonalSum1 = boardState[0][0] + boardState[1][1] + boardState[2][2];
  let diagonalSum2 = boardState[0][2] + boardState[1][1] + boardState[2][0];
  if (diagonalSum1 === 3 || diagonalSum2 === 3) {
    endGame(1);
  } else if (diagonalSum1 === -3 || diagonalSum2 === -3) {
    endGame(2);
  }

  /* Check for tie game
     * `indexOf[0]` returns `-1` if `0` is NOT present in the list
     * this `if` statement checks if all cells have been marked already
       * and only runs when the above checks have already failed
  */
  if (boardState[0].indexOf(0) === -1 &&
      boardState[1].indexOf(0) === -1 &&
      boardState[2].indexOf(0) === -1) {
    endGame(0);
  }
}

function endGame(winner: number): void {
  gameOver = true;
  if (winner === 0) {
    results.innerText = "It's a tie!";
  } else {
    results.innerText = `Player ${winner} wins!`;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    placeMarker(index);
  })
})

button.addEventListener("click", () => {
  // Reset board state
  boardState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  // Reset active player
  player = 1;

  // Reset game state
  gameOver = false;
  cells.forEach(cell => {
    cell.classList.remove("X", "O");
  });
  results.innerText = "";
  updateCurrent();
})
