import { useNavigate } from "react-router-dom";
import { useConnect4 } from "../../contexts/Connect4Context";
import Button from "../../home/components/Button";
import Connect4Modal from "./board-components/Connect4Modal";

const PauseModal = () => {
  const { dispatch, closeModal } = useConnect4();
  const navigate = useNavigate();

  const handleRestart = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "RESET" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
  };
  const handleContinue = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
  };
  const handleQuitGame = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "RESET" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
    navigate("/");
  };
  const buttons = [
    { label: "Continue game", action: handleContinue },
    { label: "Restart", action: handleRestart },
    { label: "Quit game", action: handleQuitGame },
  ];

  return (
    <>
      <div
        onClick={handleContinue}
        className={` ${closeModal ? "flex" : "hidden"} fixed inset-0 z-[50] items-center justify-center bg-[#00000080] opacity-90`}
      ></div>
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center ${closeModal ? "flex" : "hidden"}`}
      >
        <Connect4Modal
          title="Pause"
          className="flex flex-col items-center gap-6"
          modalClassName="bg-[#7945FF] items-center justify-center md:h-[30.6875rem] md:w-[30rem]"
        >
          {buttons.map((button, i) => (
            <Button
              key={i}
              className={`flex w-[295px] items-center justify-around text-center ${i === 2 ? "bg-[#FD6687] text-white" : "bg-white"} text-black`}
              onClick={button.action}
            >
              {button.label}
            </Button>
          ))}
        </Connect4Modal>
      </div>
    </>
  );
};

export default PauseModal;
