import React, { useState, useEffect } from "react";

const ConnectFour = () => {
  // Game state
  const [board, setBoard] = useState(
    Array(7)
      .fill()
      .map(() => Array(6).fill(null)),
  );
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winner, setWinner] = useState(null);

  // Check for a win
  const checkWinner = (newBoard) => {
    const directions = [
      // Horizontal
      { dx: 1, dy: 0 },
      // Vertical
      { dx: 0, dy: 1 },
      // Diagonal down-right
      { dx: 1, dy: 1 },
      // Diagonal down-left
      { dx: -1, dy: 1 },
    ];

    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        const currentColor = newBoard[col][row];
        if (!currentColor) continue;

        for (const { dx, dy } of directions) {
          let count = 0;
          for (let i = 0; i < 4; i++) {
            const newCol = col + i * dx;
            const newRow = row + i * dy;

            if (
              newCol < 0 ||
              newCol >= 7 ||
              newRow < 0 ||
              newRow >= 6 ||
              newBoard[newCol][newRow] !== currentColor
            ) {
              break;
            }
            count++;
          }

          if (count === 4) {
            return currentColor;
          }
        }
      }
    }

    // Check for draw
    if (newBoard.every((column) => column.every((cell) => cell !== null))) {
      return "draw";
    }

    return null;
  };

  // Handle column click
  const handleColumnClick = (columnIndex) => {
    if (winner) return;

    // Find the first empty row in the selected column
    const column = board[columnIndex];
    const rowIndex = column.findIndex((cell) => cell === null);

    if (rowIndex === -1) return; // Column is full

    // Create a new board with the updated column
    const newBoard = board.map((col, idx) =>
      idx === columnIndex
        ? col.map((cell, rIdx) => (rIdx === rowIndex ? currentPlayer : cell))
        : col,
    );

    setBoard(newBoard);

    // Check for winner
    const winningColor = checkWinner(newBoard);
    if (winningColor) {
      setWinner(winningColor);
    } else {
      // Switch players
      setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(
      Array(7)
        .fill()
        .map(() => Array(6).fill(null)),
    );
    setCurrentPlayer("red");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Connect Four</h1>

      {/* Game Status */}
      <div className="mb-4 text-xl">
        {winner
          ? winner === "draw"
            ? "It's a Draw!"
            : `${winner.toUpperCase()} Wins!`
          : `Current Player: ${currentPlayer.toUpperCase()}`}
      </div>

      {/* Game Board SVG */}
      <svg
        width="335"
        height="310"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        {/* Original SVG path from the provided document */}
        <path
          d="M315 1.5c5.109 0 9.734 2.07 13.081 5.419A18.442 18.442 0 0 1 333.5 20v270c0 5.109-2.07 9.734-5.419 13.081A18.442 18.442 0 0 1 315 308.5H20c-5.109 0-9.734-2.07-13.081-5.419A18.442 18.442 0 0 1 1.5 290V20c0-5.109 2.07-9.734 5.419-13.081A18.442 18.442 0 0 1 20 1.5h295Zm-7.563 241.178c-5.099 0-9.715 2.07-13.056 5.415a18.44 18.44 0 0 0-5.406 13.071 18.44 18.44 0 0 0 5.406 13.071 18.392 18.392 0 0 0 13.056 5.416c5.098 0 9.714-2.07 13.055-5.416a18.44 18.44 0 0 0 5.407-13.07 18.44 18.44 0 0 0-5.407-13.072 18.392 18.392 0 0 0-13.055-5.415Z"
          fill="#FFF"
          stroke="#000"
          strokeWidth="3"
          fillRule="evenodd"
        />

        {/* Render game pieces */}
        {board.map((column, colIndex) =>
          column.map((piece, rowIndex) => {
            // Adjust x and y to create a grid-like placement
            const x = 40 + colIndex * 45; // Horizontal spacing
            const y = 40 + (5 - rowIndex) * 45; // Vertical spacing (inverted)

            return piece ? (
              <circle
                key={`${colIndex}-${rowIndex}`}
                cx={x}
                cy={y}
                r="20"
                fill={piece}
              />
            ) : null;
          }),
        )}

        {/* Clickable column overlay */}
        {board.map((_, colIndex) => (
          <rect
            key={`column-${colIndex}`}
            x={40 + colIndex * 45 - 22.5}
            y="0"
            width="45"
            height="310"
            fill="transparent"
            onClick={() => handleColumnClick(colIndex)}
          />
        ))}
      </svg>

      {/* Reset Button */}
      {winner && (
        <button
          onClick={resetGame}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default ConnectFour;
