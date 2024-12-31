import { AnimatePresence, motion } from "framer-motion";
import { useConnect4 } from "../../contexts/Connect4Context";
import Connect4Modal from "../../game/components/board-components/Connect4Modal";

const howToPlay: string[] = [
  "Red goes first in the first game.",
  "Players must alternate turns, and only one disc can be dropped in each turn. ",
  "The game ends when there is a 4-in-a-row or a stalemate.",
  "The starter of the previous game goes second on the next game.",
];
const h2ClassName: string = "font-bold uppercase text-[#7945FF]";
const summaryClassName: string =
  "flex flex-col gap-3 text-base font-medium opacity-60";
const RulesModal = () => {
  const { dispatch, closeModal } = useConnect4();
  const handleToggle = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "TOGGLE_PAUSE", payload: false });
  };
  return (
    <div>
      <AnimatePresence>
        {closeModal && (
          <>
            {" "}
            <div
              onClick={handleToggle}
              className={`fixed inset-0 z-40 flex items-center justify-center bg-[#00000080] opacity-90`}
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
              className={`} fixed inset-0 z-40 flex items-center justify-center`}
            >
              <Connect4Modal
                title="rules"
                className="flex items-start"
                modalClassName="bg-white flex relative flex-col items-center md:h-[36.6875rem] md:w-[30rem] py-4 h-[38.7rem] px-4 text-black"
              >
                <div className="relative flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <h2 className={h2ClassName}>Objective</h2>
                    <p className={summaryClassName}>
                      Be the first player to connect 4 of the same colored discs
                      in a row (either vertically, horizontally, or diagonally).
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-bold uppercase text-[#7945FF]">
                      how to play
                    </h2>
                    <ol className="flex flex-col gap-4 text-base font-medium opacity-60">
                      {howToPlay.map((item, i: number) => (
                        <li key={item} className="flex gap-3">
                          <span className="font-bold">{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <motion.img
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    src="images/icon-check.svg"
                    alt="icon-check"
                    className="absolute bottom-[-5rem] right-[42%] h-16"
                    onClick={handleToggle}
                  />
                </div>
              </Connect4Modal>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RulesModal;
