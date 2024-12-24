import { useConnect4 } from "../../contexts/Connect4Context";
import TurnBackgroundYellow from "./components/TurnBackgroundYellow";
import TurnRedBackground from "./components/TurnRedBackground";
import WinningComponent from "./components/WinningComponent";

const Footer = () => {
  const { currentPlayer, winner } = useConnect4();

  return (
    <div className="z-20 flex w-full -translate-y-[3.3rem] flex-col items-center justify-center">
      {winner ? (
        <WinningComponent />
      ) : (
        <>
          {currentPlayer === "red" ? (
            <TurnRedBackground />
          ) : (
            <TurnBackgroundYellow />
          )}
        </>
      )}
    </div>
  );
};

export default Footer;
