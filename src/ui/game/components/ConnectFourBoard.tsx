import BoardWhite from "./board-components/BoardWhite";
import BoardBlack from "./board-components/BoardBlack";
import CounterRed from "./board-components/CounterRed";
import CounterYellow from "./board-components/CounterYellow";
import { useConnect4 } from "../../contexts/Connect4Context";
import { useEffect } from "react";
import BoardWhiteBig from "./board-components/BoardWhiteBig";
import BoardBlackBig from "./board-components/BoardBlackBig";
import CounterRedBig from "./board-components/CounterRedBig";
import CounterYellowBig from "./board-components/CounterYellowBig";
import ScoreCard from "./ScoreCard";

const ConnectFourBoard = () => {
  const {
    dispatch,
    gameBoard,
    currentPlayer,
    winner,
    timer,
    paused,
    winningCells,
    player1Score,
    player2Score,
    gameMode,
    deActivateBoard,
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
    <div className="lg:flex lg:items-center lg:justify-center lg:gap-7">
      <div className="max-lg:hidden">
        <ScoreCard
          name={gameMode === "player" ? "player1" : "you"}
          img={
            gameMode === "player" ? "/images/player-one.svg" : "/images/you.svg"
          }
          points={player1Score}
          className="-left-5 lg:-top-5 lg:left-11 lg:right-0"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center sm:hidden">
        <div
          className={`z-[77] ${!deActivateBoard ? "hidden" : "absolute"} max-sm:h-[19.375rem] max-sm:w-[20.9375rem]`}
        ></div>
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
                  fill="transparent"
                  stroke="transparent"
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
      <div className="relative flex flex-col items-center justify-center max-sm:hidden">
        <div
          className={`z-[77] md:h-[35rem] ${!deActivateBoard ? "hidden" : "absolute"} md:w-[39rem]`}
        ></div>
        <BoardWhiteBig>
          {gameBoard.map((row, rowIndex) =>
            row.map((_, colIndex) => (
              <>
                <circle
                  key={`${rowIndex}-${colIndex}`}
                  cx={46 + colIndex * 90}
                  cy={49 + rowIndex * 89}
                  r="30"
                  fill={"transparent"}
                  stroke="transparent"
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
        </BoardWhiteBig>
        <BoardBlackBig>
          {gameBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <>
                <g
                  className={
                    isWinningCell(rowIndex, colIndex) ? "winning-animation" : ""
                  }
                  key={`${rowIndex}-${colIndex}`}
                  transform={`translate(${16 + colIndex * 88}, ${
                    11 + rowIndex * 88
                  })`}
                >
                  {cell === "red" && <CounterRedBig />}
                  {cell === "yellow" && <CounterYellowBig />}
                </g>
              </>
            )),
          )}
        </BoardBlackBig>
      </div>
      <div className="max-lg:hidden">
        <ScoreCard
          name={gameMode === "player" ? "player2" : "cpu"}
          img={
            gameMode === "player" ? "/images/player-two.svg" : "/images/cpu.svg"
          }
          points={player2Score}
          // className="-right-5"
          className="-right-5 lg:-top-5 lg:left-11 lg:right-0"
          scoreClassname="md:order-1 lg:-order-1"
        />
      </div>
    </div>
  );
};

export default ConnectFourBoard;
