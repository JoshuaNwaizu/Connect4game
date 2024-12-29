import { useConnect4 } from "../contexts/Connect4Context";
import ConnectFourBoard from "./components/ConnectFourBoard";
import Nav from "./components/Nav";
import PauseModal from "./components/PauseModal";
import ScoreBoard from "./components/ScoreBoard";
import Footer from "./Footer/Footer";

const GamePage = () => {
  const { winner } = useConnect4();
  return (
    <div className="relative flex flex-col gap-7 px-4">
      <div
        className={`absolute -bottom-6 left-0 right-0 h-[35svh] rounded-t-[3.5rem] md:h-[25svh] lg:h-[31svh] ${winner === "yellow" ? "bg-[#FFCE67]" : "bg-[#5C2DD5]"} ${winner === "red" ? "bg-[#FD6687]" : "bg-[#5C2DD5]"} `}
      ></div>
      <Nav />{" "}
      <div className="mt-[7rem] flex flex-col gap-7 px-4">
        <ScoreBoard />
        <ConnectFourBoard />
        <Footer />
        <PauseModal />
      </div>
    </div>
  );
};

export default GamePage;
