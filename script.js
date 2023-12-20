document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restartBtn");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      return null;
    };
  
    const checkDraw = () => {
      return !gameBoard.includes("");
    };
  
    const updateMessage = (winner) => {
      if (winner) {
        message.textContent = `${winner} wins!`;
      } else if (checkDraw()) {
        message.textContent = "It's a draw!";
      } else {
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    };
  
    const handleCellClick = (index) => {
      if (gameBoard[index] || checkWinner() || checkDraw()) {
        return;
      }
  
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
  
      const winner = checkWinner();
      if (winner || checkDraw()) {
        updateMessage(winner);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateMessage();
      }
    };
  
    const restartGame = () => {
      currentPlayer = "X";
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((cell) => (cell.textContent = ""));
      message.textContent = "Player X's turn";
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleCellClick(index));
    });
  
    restartBtn.addEventListener("click", restartGame);
  
    restartGame();
  });
  