import { useConnect4 } from "../../contexts/Connect4Context";
import ScoreCard from "./ScoreCard";

const ScoreBoard = () => {
  const { player1Score, player2Score, gameMode } = useConnect4();
  return (
    <div className="flex justify-around gap-10 md:justify-center lg:hidden">
      <ScoreCard
        name={gameMode === "player" ? "player1" : "you"}
        img={
          gameMode === "player" ? "/images/player-one.svg" : "/images/you.svg"
        }
        points={player1Score}
        className="-left-5"
      />
      <ScoreCard
        name={gameMode === "player" ? "player2" : "cpu"}
        img={
          gameMode === "player" ? "/images/player-two.svg" : "/images/cpu.svg"
        }
        points={player2Score}
        className="-right-5"
        scoreClassname="md:order-1"
      />
    </div>
  );
};

export default ScoreBoard;
