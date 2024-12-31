import { motion } from "framer-motion";
import { useConnect4 } from "../../contexts/Connect4Context";
import ScoreCard from "./ScoreCard";

const ScoreBoard = () => {
  const { player1Score, player2Score, gameMode } = useConnect4();
  const secondCardVariant = {
    hidden: { x: -70, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const firstCardVariant = {
    hidden: { x: 700, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className="flex justify-center gap-10 md:justify-center lg:hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={secondCardVariant}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <ScoreCard
          name={gameMode === "player" ? "player1" : "you"}
          img={
            gameMode === "player" ? "/images/player-one.svg" : "/images/you.svg"
          }
          points={player1Score}
          className="-left-5"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={firstCardVariant}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <ScoreCard
          name={gameMode === "player" ? "player2" : "cpu"}
          img={
            gameMode === "player" ? "/images/player-two.svg" : "/images/cpu.svg"
          }
          points={player2Score}
          className="-right-5"
          scoreClassname="md:order-1"
        />
      </motion.div>
    </div>
  );
};

export default ScoreBoard;
