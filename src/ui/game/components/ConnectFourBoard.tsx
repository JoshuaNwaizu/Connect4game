import BoardWhite from "./board-components/BoardWhite";
import BoardBlack from "./board-components/BoardBlack";
import CounterRed from "./board-components/CounterRed";
import CounterYellow from "./board-components/CounterYellow";
import { useConnect4 } from "../../contexts/Connect4Context";
import { useEffect } from "react";

const ConnectFourBoard = () => {
  const {
    dispatch,
    gameBoard,
    currentPlayer,
    winner,
    timer,
    paused,
    winningCells,
  } = useConnect4();

  const isColumnFilled = (colIndex: number): string | null => {
    return gameBoard[0][colIndex];
  };
  const isWinningCell = (rowIndex: number, colIndex: number): boolean => {
    return winningCells.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex,
    );
  };

  useEffect(() => {
    if (timer === 0 && !winner) {
      const availableColumns = gameBoard[0]
        .map((cell, colIndex) => (cell === null ? colIndex : null))
        .filter((col) => col !== null);
      if (availableColumns.length > 0) {
        const randomColumn =
          availableColumns[Math.floor(Math.random() * availableColumns.length)];

        dispatch({ type: "DROP_PIECE", payload: randomColumn });
      }

      dispatch({ type: "TIMER", payload: 15 });
    }
    const interval: number = setInterval(() => {
      if (!paused && !winner) {
        dispatch({ type: "TIMER", payload: timer - 1 });
      }
    }, 1000);
    console.log(timer);
    return () => clearInterval(interval);
  }, [timer, gameBoard, dispatch, paused]);

  useEffect(() => {
    dispatch({ type: "TIMER", payload: 15 });
  }, [currentPlayer]);

  return (
    <div className="relative flex flex-col items-center justify-center">
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
                onClick={() => {
                  if (isColumnFilled(colIndex)) {
                    return;
                  }
                  dispatch({ type: "DROP_PIECE", payload: colIndex });
                }}
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
              className={
                isWinningCell(rowIndex, colIndex) ? "winning-animation" : ""
              }
              key={`${rowIndex}-${colIndex}`}
              transform={`translate(${10 + colIndex * 46}, ${
                10 + rowIndex * 46
              })`}
            >
              {cell === "red" && <CounterRed />}
              {cell === "yellow" && <CounterYellow />}
            </g>
          )),
        )}
      </BoardBlack>
    </div>
  );
};

export default ConnectFourBoard;
