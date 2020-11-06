
/* ==================== Model =================== */

class Board {
  constructor() {
    this.isX = true;
    this.board = [
      [' ',' ',' '],
      [' ',' ',' '],
      [' ',' ',' ']
    ];
  }

  addMove(coords) {
    var row = coords[0];
    var col = coords[1];
    this.isX ? this.board[row][col] = 'X' : this.board[row][col] = 'O';
  }

  hasWon(coords) {
    var row = coords[0];
    var col = coords[1];
    var player = this.isX ? 'X' : 'O';
    // Check Row and Column
    var hasRow = true;
    var hasCol = true;
    for (var i = 0; i < 3; i++) {
      if (this.board[row][i] !== player) {
        hasRow = false
      }
      if (this.board[i][col] !== player) {
        hasCol = false;
      }
    }
    if (hasRow || hasCol) {
      this.isX = player === 'X' ? true : false;
      return true;
    }

    // Check Major and Minor Diagonal
    var diagCount = 0;
    if (row === col) {
      for (var i = 0; i < 3; i++) {
        if (this.board[i][i] === player) {
          diagCount++;
        }
      }
    } else {
      for (var i = 0; i < 3; i++) {
        if (this.board[2 - i][i] === player) {
          diagCount ++;
        }
      }
    }
    if (diagCount === 3) {
      this.isX = player === 'X' ? true : false;
      return true;
    }
    return false;
  }

  reset() {
    this.board = [
      [' ',' ',' '],
      [' ',' ',' '],
      [' ',' ',' ']
    ];
  }
}

/* ================== Controllers and Viewers =============== */

var table = document.getElementById('board');
var squares = document.querySelectorAll('td')
var resetBtn = document.getElementById('reset');
var winCont = document.getElementById('winner');
var winMsg = document.createElement('h1');
var board = new Board();

table.addEventListener('click', (e) => {
  // Updates board data
  var coords = e.target.id.split('-');
  board.addMove(coords);
  // Updates view board
  var text = e.target.textContent;
  if (text !== 'X' && text !== 'O') {
    board.isX ? e.target.textContent = 'X' : e.target.textContent = 'O';
  }
  if (board.hasWon(coords)) {
    var winner = board.isX ? 'X' : '0';
    winMsg.textContent = `Winner is: ${winner}!!!`;
    winCont.append(winMsg);
  } else {
    board.isX = !board.isX;
  }
});

// Resets view board
resetBtn.addEventListener('click', (e) => {
  if (winCont.hasChildNodes()) {
    winCont.removeChild(winMsg);
  }
  squares.forEach(square => {
    square.textContent = '_';
  });
  board.reset();
});
