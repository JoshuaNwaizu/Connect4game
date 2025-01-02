import BoardWhite from "../board-components/board-svgs/BoardWhite";
import BoardBlack from "../board-components/board-svgs/BoardBlack";
import CounterYellow from "../board-components/counter-svgs/CounterYellow";
import CounterRed from "../board-components/counter-svgs/CounterRed";
import { useConnect4 } from "../../../contexts/Connect4Context";

const SmallBoard = () => {
  const { dispatch, winner, deActivateBoard, gameBoard, winningCells } =
    useConnect4();

  const isColumnFilled = (colIndex: number): string | null => {
    return gameBoard[0][colIndex];
  };
  const isWinningCell = (rowIndex: number, colIndex: number): boolean => {
    return winningCells.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex,
    );
  };
  return (
    <div className="relative flex flex-col items-center justify-center sm:hidden">
      <div
        className={`z-[77] ${!winner && !deActivateBoard ? "hidden" : "absolute"} max-sm:h-[19.375rem] max-sm:w-[20.9375rem]`}
      ></div>
      <BoardWhite>
        {/* Generate circles for the Board */}
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
            <>
              <g
                key={`${rowIndex}-${colIndex}`}
                transform={`translate(${10 + colIndex * 46}, ${
                  10 + rowIndex * 46
                })`}
              >
                {cell === "red" && (
                  <>
                    <CounterRed />{" "}
                    {isWinningCell(rowIndex, colIndex) && (
                      <svg
                        width="30"
                        height="30"
                        className="flex items-center justify-center"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="17"
                          cy="17"
                          className="translate-x-[.3rem] translate-y-[.3rem]"
                          r="10"
                          stroke="white"
                          strokeWidth="6"
                        />
                      </svg>
                    )}
                  </>
                )}
                {cell === "yellow" && (
                  <>
                    <CounterYellow />

                    {isWinningCell(rowIndex, colIndex) && (
                      <svg
                        width="30"
                        height="30"
                        className="flex items-center justify-center"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="17"
                          cy="17"
                          className="translate-x-[.3rem] translate-y-[.3rem]"
                          r="10"
                          stroke="white"
                          strokeWidth="6"
                        />
                      </svg>
                    )}
                  </>
                )}
              </g>
            </>
          )),
        )}
      </BoardBlack>
    </div>
  );
};

export default SmallBoard;
