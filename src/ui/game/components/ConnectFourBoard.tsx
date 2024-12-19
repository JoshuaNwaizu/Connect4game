import { useState } from "react";
import BoardWhite from "./board-components/BoardWhite";
import BoardBlack from "./board-components/BoardBlack";
import CounterRed from "./board-components/CounterRed";
import CounterYellow from "./board-components/CounterYellow";
import { useConnect4 } from "../../contexts/Connect4Context";

const ConnectFourBoard = () => {
  const { dispatch, gameBoard, currentPlayer } = useConnect4();

  const handleDrop = (column: number) => {
    dispatch({ type: "DROP_PIECE", payload: column });
  };

  // const columns = 7;
  // const gameBoardPiece = Array.from({ length: rows }, () =>
  //   Array(columns).fill(null),
  // );
  // const [gameBoard, setGameBoard] =
  //   useState<(string | null)[][]>(gameBoardPiece);
  // const [currentPlayer, setCurrentPlayer] = useState<"red" | "yellow">("red");

  // const handleDrop = (column: number) => {
  //   const newBoard = [...gameBoard];
  //   for (let row = rows - 1; row >= 0; row--) {
  //     if (!newBoard[row][column]) {
  //       newBoard[row][column] = currentPlayer; // Example: red piece for player 1
  //       break;
  //     }
  //   }
  //   setGameBoard(newBoard);
  //   setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red"); // Switch player
  //   console.log(gameBoard);
  // };

  return (
    <div className="relative flex flex-col items-center justify-center mt-9">
      <BoardWhite>
        {/* Generate Circles for the Board */}
        {gameBoard.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <>
              <circle
                key={`${rowIndex}-${colIndex}`}
                cx={27 + colIndex * 47}
                cy={27 + rowIndex * 47}
                r="20"
                fill={"transparent"}
                stroke="#000000"
                onClick={() => handleDrop(colIndex)} // Handle piece placement
                className="cursor-pointer"
              />
            </>
          )),
        )}
      </BoardWhite>

      <BoardBlack>
        {gameBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <g
              className=""
              key={`${rowIndex}-${colIndex}`}
              transform={`translate(${10 + colIndex * 46}, ${
                10 + rowIndex * 46
              })`}
            >
              {/* Render the appropriate SVG based on the cell value */}
              {cell === "red" && <CounterRed />}
              {cell === "yellow" && <CounterYellow />}
            </g>
            // <circle
            //   key={`${rowIndex}-${colIndex}`}
            //   cx={26 + colIndex * 47} // Adjust spacing between columns
            //   cy={27 + rowIndex * 47} // Adjust spacing between rows
            //   r="20"
            //   fill={cell || "transparent"} // Default white for empty
            //   stroke="#000000"
            // />
          )),
        )}
      </BoardBlack>
    </div>
  );
};

export default ConnectFourBoard;
