import { useNavigate } from "react-router-dom";
import { useConnect4 } from "../../contexts/Connect4Context";
import Button from "../../home/components/Button";
import Connect4Modal from "./board-components/Connect4Modal";
import { AnimatePresence, motion } from "framer-motion";
import { playAudio } from "../../home/Home";

const PauseModal = () => {
  const { dispatch, closeModal } = useConnect4();
  const navigate = useNavigate();

  const restartAudio = () => {
    playAudio.currentTime = 0; // Restart the sound
    playAudio.play();
    playAudio.volume = 0.4;
  };
  const handleRestart = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "RESET" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
    restartAudio();
  };

  const handleContinue = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
    playAudio.play();
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
    <div>
      <AnimatePresence>
        {closeModal && (
          <>
            <div
              onClick={handleContinue}
              className={`fixed inset-0 z-[50] flex items-center justify-center bg-[#00000080] opacity-90`}
            ></div>
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                ease: "backInOut",
              }}
              exit={{
                scale: 0,
              }}
              className={`fixed inset-0 z-[80] flex items-center justify-center`}
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
            </motion.div>{" "}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PauseModal;
