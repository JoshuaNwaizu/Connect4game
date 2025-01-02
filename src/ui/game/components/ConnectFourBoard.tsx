import { useConnect4 } from "../../contexts/Connect4Context";
import { useEffect } from "react";

import ScoreCard from "./ScoreCard";

import SmallBoard from "./game-parts/SmallBoard";
import BigBoard from "./game-parts/BigBoard";

const ConnectFourBoard = () => {
  const {
    dispatch,
    gameBoard,
    currentPlayer,
    winner,
    timer,
    paused,
    player1Score,
    player2Score,
    gameMode,
  } = useConnect4();

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
    return () => clearInterval(interval);
  }, [timer, gameBoard, dispatch, paused, winner]);

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

      <SmallBoard />
      <BigBoard />

      <div className="max-lg:hidden">
        <ScoreCard
          name={gameMode === "player" ? "player2" : "cpu"}
          img={
            gameMode === "player" ? "/images/player-two.svg" : "/images/cpu.svg"
          }
          points={player2Score}
          className="-right-5 lg:-top-5 lg:left-11 lg:right-0"
          scoreClassname="md:order-1 lg:-order-1"
        />
      </div>
    </div>
  );
};

export default ConnectFourBoard;
