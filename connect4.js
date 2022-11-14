/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2

const board = [];
// array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//21-28
function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    let rowArray = [];
    for (let j = 0; j < WIDTH; j++) {
      rowArray.push(null);
    }
    board.push(rowArray);
  }
  // DONE?  TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // DONE TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // DONE TODO: add comment for this code // what? creates a table row, set each row's ID to 'column-top', add a click listener to each row, when clicked run handleClick
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //DONE  TODO: add comment for this code // creates a row, total rows will equal Height number, creates a cell in each row, num of cells will be equal to Width. Each cell's ID will equal y - x coordinates. Cell is appended to row and row is appended to htmlBoard. Similar to how the original board was created by using Height and Width variables as cycle run limits for loops running to create each table data point within each table row.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // loop over each row board[0-5]
  // loop over each element in each row aka board[0][0-6]
  //start at board[5][x], if that is equal to ? iterate  to board[4][x] aka reverse iteration to start at bottom of board
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (typeof board[y][x] === 'object') {
      // console.log(y);
      return y;
    }
  }
  // return 0;
}
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const circle = document.createElement('div');
  circle.classList.add('piece');
  circle.classList.add(`p${currPlayer}`);
  let td = document.getElementById(`${y}-${x}`);
  td.append(circle);
  // DONE TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // DONE ? TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // DONE TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = `${currPlayer}`;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie

  // DONE TODO: check if all cells in board are filled; if so call, call endGame
  function rowPlayed(row) {
    return row.every(function (spot) {
      return typeof spot === 'string';
    });
  }
  function boardPlayed(board) {
    return board.every(function (row) {
      return rowPlayed(row);
    });
  }
  if (boardPlayed(board)) endGame('Looks like we have a tie, lets play again!!');
  // switch players
  // DONE TODO: switch currPlayer 1 <-> 2
  currPlayer < 2 ? (currPlayer = 2) : (currPlayer = 1);
  // if (currPlayer === 1) {
  //   currPlayer = 2;
  // } else if (currPlayer === 2) {
  //   currPlayer = 1;
  // }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(([y, x]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && +board[y][x] === currPlayer);
  }

  // TODO: read and understand this code. Add comments to help you.
  // Loop over each space, going row by row.
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(board);
makeHtmlBoard();
