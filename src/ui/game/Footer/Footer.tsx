import { AnimatePresence, motion } from "framer-motion";
import { useConnect4 } from "../../contexts/Connect4Context";
import TurnBackgroundYellow from "./components/TurnBackgroundYellow";
import TurnRedBackground from "./components/TurnRedBackground";
import WinningComponent from "./components/WinningComponent";

const Footer = () => {
  const { currentPlayer, winner } = useConnect4();

  return (
    <div className="z-20 flex w-full -translate-y-[3.3rem] flex-col items-center justify-center">
      <AnimatePresence>
        {winner ? (
          <motion.div
            initial={{ opacity: 0, rotate: "0deg", scale: 0 }}
            animate={{ opacity: 1, rotate: "360deg", scale: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              ease: "backInOut",
            }}
            exit={{ opacity: 0, rotate: "0deg", scale: 0 }}
          >
            <WinningComponent />
          </motion.div>
        ) : (
          <>
            {currentPlayer === "red" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  ease: "backInOut",
                }}
              >
                <TurnRedBackground />
              </motion.div>
            ) : (
              <TurnBackgroundYellow />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Footer;
