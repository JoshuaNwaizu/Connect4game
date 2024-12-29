import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import RulesModal from "./components/RulesModal";
import { useConnect4 } from "../contexts/Connect4Context";

const Home = () => {
  const { dispatch } = useConnect4();
  const navigate = useNavigate();
  const handleToggle = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
  };
  const playWithCpu = (): void => {
    dispatch({ type: "SET_GAME_MODE", payload: "cpu" });
    navigate("/game-page");
  };
  const playWithPlayer = (): void => {
    dispatch({ type: "SET_GAME_MODE", payload: "player" });
    navigate("/game-page");
  };
  return (
    <section className="flex h-svh w-svw flex-col items-center justify-center gap-[4rem] bg-[#5C2DD5]">
      <div className="flex flex-col items-center justify-center gap-[4rem] md:h-[33.6rem] md:w-[30rem] md:rounded-[2.5rem] md:border-[3px] md:border-black md:bg-[#7945FF] md:shadow-[0px_10px_0px_0px_#000]">
        <div>
          <img src="images/logo.svg" alt="logo" />
        </div>

        <div className="flex flex-col gap-6">
          <Button className="bg-[#FD6687] text-white" onClick={playWithCpu}>
            <p>play vs cpu</p>
            <img src="/images/player-vs-cpu.svg" alt="play vs cpu" />
          </Button>

          <Button className="bg-[#FFCE67] text-black" onClick={playWithPlayer}>
            {" "}
            <p>play vs player</p>
            <img
              src="public/images/player-vs-player.svg"
              alt="play vs player"
            />
          </Button>

          <Button className="text-black bg-white" onClick={handleToggle}>
            <p>game rules</p>
          </Button>
        </div>
      </div>
      <RulesModal />
    </section>
  );
};

export default Home;