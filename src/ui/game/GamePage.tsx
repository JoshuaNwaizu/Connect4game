import ConnectFourBoard from "./components/ConnectFourBoard";
import Nav from "./components/Nav";
import PauseModal from "./components/PauseModal";
import ScoreBoard from "./components/ScoreBoard";
import Footer from "./Footer/Footer";

const GamePage = () => {
  return (
    <div className="flex flex-col gap-7 px-4">
      <Nav />
      <ScoreBoard />
      <ConnectFourBoard />
      <Footer />
      <PauseModal />
    </div>
  );
};

export default GamePage;
