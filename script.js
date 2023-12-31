document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restartBtn");
    const resultScreen = document.getElementById("resultScreen");
    const resultMessage = document.getElementById("resultMessage");
    const restartBtnResult = document.getElementById("restartBtnResult");
  
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
        showResultScreen(`${winner} wins!`);
      } else if (checkDraw()) {
        message.textContent = "It's a draw!";
        showResultScreen("It's a draw!");
      } else {
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    };

    const highlightCell = (index) => {
      cells[index].classList.add("highlight");
      setTimeout(() => cells[index].classList.remove("highlight"), 1000);
    };
  
    const handleCellClick = (index) => {
      if (gameBoard[index] || checkWinner() || checkDraw()) {
        return;
      }
  
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
      cells[index].classList.add("move");

      highlightCell(index);
  
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
      hideResultScreen();
    };
  
    const showResultScreen = (result) => {
      resultMessage.textContent = result;
      resultScreen.style.display = "flex";
    };
  
    const hideResultScreen = () => {
      resultScreen.style.display = "none";
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleCellClick(index));
    });
  
    restartBtn.addEventListener("click", restartGame);
    restartBtnResult.addEventListener("click", restartGame);
  
    restartGame();
  });
  