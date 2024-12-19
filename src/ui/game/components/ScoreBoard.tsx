import ScoreCard from "./ScoreCard";

const ScoreBoard = () => {
  return (
    <div className="flex justify-around">
      <ScoreCard
        name="player1"
        img="/images/player-one.svg"
        points={13}
        className="-left-5"
      />
      <ScoreCard
        name="player2"
        img="/images/player-two.svg"
        points={24}
        className="-right-5"
      />
    </div>
  );
};

export default ScoreBoard;
