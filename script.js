let ogBoard;
const human = "O";
const ai = "X";

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const cells = Array.from(document.querySelectorAll(".cell"));
console.log(cells);

startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  ogBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
  if (typeof ogBoard[square.target.id] == "number") {
    turn(square.target.id, human);
    if (!checkTie()) turn(bestSpot(), ai);
  }
}

function turn(squareId, player) {
  ogBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(ogBoard, player); // the checkWin returns an object
  // gameWon object contains index reference to the win in winCombos
  // and player who has won
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  // board.reduce((a, e, i) => (e === player ? a.push(i) : a), []);
  //here reduce function returns an array("a" - accumulator)
  // a is init to []
  // e is every element of board (array on which reduce is called upon )
  // i is index of the element
  // reduce takes 2 param - a, e ;1 optional param - i.
  // we return the a array value to store in "plays"
  // to store the "boxes crossed" by players.
  let plays = board.reduce((a, e, i) => {
    if (e === player) {
      a.push(i);
    }
    return a;
  }, []);

  // now we have plays which stores all the values played by player
  // we'll check if those values in player are going to match the win(index) in winCombos

  let gameWon = null;
  // checks every elem in win with plays.indexOf(elem)
  //plays.indexOf(elem) returns :  index > 1 if found : else returns -1
  // so if returns -1 , the win(index) combos is not complete so false and
  // gameWon remains null a falsy value
  for (const [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == human ? "lightblue" : "lightcoral";
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player == human ? "You Win!" : "RavenX Wins");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return ogBoard.filter((s) => typeof s == "number");
}

function bestSpot() {
  return minmax(ogBoard, ai).index;
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "lightgreen";
      cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
  return false;
}

function minmax(newBoard, player) {
  let getSpots = emptySquares(newBoard);
  if (checkWin(newBoard, player)) {
    return { score: -1 };
  } else if (checkWin(newBoard, ai)) {
    return { score: 1 };
  } else if (getSpots.length === 0) {
    return { score: 0 };
  }

  let moves = [];
  for (let i = 0; i < getSpots.length; i++) {
    let move = {};
    move.index = newBoard[getSpots[i]];
    newBoard[getSpots[i]] = player;

    if (player == ai) {
      let result = minmax(newBoard, human);
      move.score = result.score;
    } else {
      let result = minmax(newBoard, ai);
      move.score = result.score;
    }

    newBoard[getSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if (player == ai) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
