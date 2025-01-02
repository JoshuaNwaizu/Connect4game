import { useConnect4 } from "../../../contexts/Connect4Context";
import BoardBlackBig from "../board-components/board-svgs/BoardBlackBig";
import CounterYellowBig from "../board-components/counter-svgs/CounterYellowBig";
import CounterRedBig from "../board-components/counter-svgs/CounterRedBig";
import BoardWhiteBig from "../board-components/board-svgs/BoardWhiteBig";

const BigBoard = () => {
  const { dispatch, deActivateBoard, gameBoard, winningCells } = useConnect4();

  const isColumnFilled = (colIndex: number): string | null => {
    return gameBoard[0][colIndex];
  };
  const isWinningCell = (rowIndex: number, colIndex: number): boolean => {
    return winningCells.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex,
    );
  };
  return (
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
                  isWinningCell(rowIndex, colIndex)
                    ? "winning-animation w-full"
                    : ""
                }
                key={`${rowIndex}-${colIndex}`}
                transform={`translate(${16 + colIndex * 88}, ${
                  11 + rowIndex * 88
                })`}
              >
                {cell === "red" && (
                  <svg className="w-[5rem]">
                    <CounterRedBig />
                  </svg>
                )}
                {cell === "yellow" && <CounterYellowBig />}
              </g>
            </>
          )),
        )}
      </BoardBlackBig>
    </div>
  );
};

export default BigBoard;
