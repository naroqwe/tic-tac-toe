const gameBoardModule = (function () {
  const boardSquares = document.querySelectorAll(".field");
  const winnerHeading = document.querySelector(".winner");
  const restartButton = document.querySelector(".restart-button");

  // let board = ["x", "", "o", "x", "o", "", "x", "", ""];
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  let currentPlayer = "X";

  function render() {
    boardSquares.forEach((square, index) => {
      square.textContent = board[index];
      switchPlayer();
    });
  }

  function makeMove(index) {
    if (board[index] === "") {
      board[index] = currentPlayer;
      render();
    }
  }

  function addToArray() {
    boardSquares.forEach((square, index) => {
      square.addEventListener("click", () => {
        board.splice([index], 1, currentPlayer);
        console.log(board);
        render();
        checkWinner();
      });
    });
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const element of winConditions) {
      const [a, b, c] = element;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winnerHeading.innerHTML = `${board[c]} is the winner`;
        return true;
      }
    }
    return false;
  }
  function restartGame() {
    location.reload();
  }

  restartButton.addEventListener("click", restartGame);

  return { render, makeMove, addToArray, checkWinner };
})();

window.addEventListener("load", gameBoardModule.addToArray);
