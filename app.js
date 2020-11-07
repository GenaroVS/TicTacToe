
/* ==================== Model =================== */

class Board {
  constructor() {
    this.isX = true;
    this.plays = 0;
    this.xWins = 0;
    this.oWins = 0;
    this.board = [
      [' ',' ',' '],
      [' ',' ',' '],
      [' ',' ',' ']
    ];
  }

  addMove(coords) {
    this.plays++;
    var row = coords[0];
    var col = coords[1];
    this.isX ? this.board[row][col] = 'X' : this.board[row][col] = 'O';
  }

  hasWon(coords) {
    var row = coords[0];
    var col = coords[1];
    var player = this.isX ? 'X' : 'O';

    if (this.hasRowOrCol(row, col, player) || this.hasDiagonal(row, col, player)) {
      return true;
    }
    return false;
  }

  hasRowOrCol(row, col, player) {
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
  }

  hasDiagonal(row, col, player) {
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
    this.plays = 0;
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
var winMsg = document.createElement('h2');
var board = new Board();
var xWinsCont = document.getElementById('xWins');
var oWinsCont = document.getElementById('oWins');

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
    if (board.isX) {
      board.xWins++;
      winMsg.textContent = `Winner is: X ! ! !`;
      xWinsCont.textContent = `X wins: ${board.xWins}`
    } else {
      board.oWins++;
      winMsg.textContent = `Winner is: O ! ! !`;
      oWinsCont.textContent = `O wins: ${board.oWins}`

    }
    winCont.append(winMsg);
  } else if (board.plays === 9) {
    winMsg.textContent = 'It\'s a tie ! ! !';
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
