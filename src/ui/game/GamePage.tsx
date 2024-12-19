import ConnectFourBoard from "./components/ConnectFourBoard";
import Nav from "./components/Nav";
import ScoreBoard from "./components/ScoreBoard";

const GamePage = () => {
  return (
    <div className="px-4">
      <Nav />
      <ScoreBoard />
      <ConnectFourBoard />
    </div>
  );
};

export default GamePage;
