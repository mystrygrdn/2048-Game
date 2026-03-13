const grid = document.getElementById("grid");

let board = new Array(16).fill(0);
let score = 0;

// create grid
for (let i = 0; i < 16; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

function drawBoard() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, i) => {
    const value = board[i];

    cell.textContent = value === 0 ? "" : value;
    cell.dataset.value = value;

    if (value !== 0) {
      cell.classList.add("merge");

      setTimeout(() => {
        cell.classList.remove("merge");
      }, 200);
    }
  });

  document.getElementById("score").textContent = "Score: " + score;
}

function randomTile() {
  let empty = [];

  board.forEach((v, i) => {
    if (v === 0) empty.push(i);
  });

  if (empty.length === 0) return;

  let rand = empty[Math.floor(Math.random() * empty.length)];
  board[rand] = Math.random() < 0.9 ? 2 : 4;
}

function moveLeft() {
  for (let row = 0; row < 4; row++) {
    let arr = board.slice(row * 4, row * 4 + 4);
    arr = arr.filter((v) => v);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score += arr[i];
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((v) => v);

    while (arr.length < 4) {
      arr.push(0);
    }

    for (let i = 0; i < 4; i++) {
      board[row * 4 + i] = arr[i];
    }
  }
}

function moveRight() {
  for (let row = 0; row < 4; row++) {
    let arr = board.slice(row * 4, row * 4 + 4).reverse();
    arr = arr.filter((v) => v);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score += arr[i];
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((v) => v);

    while (arr.length < 4) {
      arr.push(0);
    }

    arr.reverse();

    for (let i = 0; i < 4; i++) {
      board[row * 4 + i] = arr[i];
    }
  }
}

function moveUp() {
  for (let col = 0; col < 4; col++) {
    let arr = [];

    for (let row = 0; row < 4; row++) {
      arr.push(board[row * 4 + col]);
    }

    arr = arr.filter((v) => v);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score += arr[i];
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((v) => v);

    while (arr.length < 4) {
      arr.push(0);
    }

    for (let row = 0; row < 4; row++) {
      board[row * 4 + col] = arr[row];
    }
  }
}

function moveDown() {
  for (let col = 0; col < 4; col++) {
    let arr = [];

    for (let row = 0; row < 4; row++) {
      arr.push(board[row * 4 + col]);
    }

    arr = arr.reverse().filter((v) => v);

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score += arr[i];
        arr[i + 1] = 0;
      }
    }

    arr = arr.filter((v) => v);

    while (arr.length < 4) {
      arr.push(0);
    }

    arr.reverse();

    for (let row = 0; row < 4; row++) {
      board[row * 4 + col] = arr[row];
    }
  }
}

function checkGameOver() {
  if (board.includes(0)) return;

  for (let i = 0; i < 16; i++) {
    if (i % 4 !== 3 && board[i] === board[i + 1]) return;

    if (i < 12 && board[i] === board[i + 4]) return;
  }

  document.getElementById("gameOverModal").style.display = "flex";
  document.getElementById("finalScore").textContent = score;
}

// keyboard control
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
  if (e.key === "ArrowUp") moveUp();
  if (e.key === "ArrowDown") moveDown();

  randomTile();
  drawBoard();
  checkGameOver();
});

// restart button
document.getElementById("restart").addEventListener("click", () => {
  board = new Array(16).fill(0);
  score = 0;

  randomTile();
  randomTile();
  drawBoard();
});

document.getElementById("restartModal").addEventListener("click", () => {
  board = new Array(16).fill(0);
  score = 0;

  randomTile();
  randomTile();
  drawBoard();

  document.getElementById("gameOverModal").style.display = "none";
});

// start game
randomTile();
randomTile();
drawBoard();
