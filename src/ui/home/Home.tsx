import { Link } from "react-router-dom";
import Button from "./components/Button";
import RulesModal from "./components/RulesModal";
import { useConnect4 } from "../contexts/Connect4Context";

const Home = () => {
  const { dispatch } = useConnect4();
  const handleToggle = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
  };
  return (
    <section className="flex h-svh w-svw flex-col items-center justify-center gap-[4rem]">
      <div>
        <img src="images/logo.svg" alt="logo" />
      </div>

      <div className="flex flex-col gap-6">
        <Button className="bg-[#FD6687] text-white">
          <p>play vs cpu</p>
          <img src="/images/player-vs-cpu.svg" alt="play vs cpu" />
        </Button>
        <Link to={"game-page"}>
          <Button className="bg-[#FFCE67] text-black">
            {" "}
            <p>play vs player</p>
            <img
              src="public/images/player-vs-player.svg"
              alt="play vs player"
            />
          </Button>
        </Link>
        <Button className="text-black bg-white" onClick={handleToggle}>
          <p>game rules</p>
        </Button>
      </div>
      <RulesModal />
    </section>
  );
};

export default Home;
