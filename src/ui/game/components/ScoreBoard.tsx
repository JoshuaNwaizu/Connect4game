import { useConnect4 } from "../../contexts/Connect4Context";
import ScoreCard from "./ScoreCard";

const ScoreBoard = () => {
  const { player1Score, player2Score } = useConnect4();
  return (
    <div className="flex justify-around">
      <ScoreCard
        name="player1"
        img="/images/player-one.svg"
        points={player1Score}
        className="-left-5"
      />
      <ScoreCard
        name="player2"
        img="/images/player-two.svg"
        points={player2Score}
        className="-right-5"
      />
    </div>
  );
};

export default ScoreBoard;
