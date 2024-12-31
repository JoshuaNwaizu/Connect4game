import { useConnect4 } from "../../contexts/Connect4Context";
import { motion } from "framer-motion";
import { playAudio } from "../../home/Home";

const menuClassName: string =
  "h-[2.44rem] w-[6.75rem] rounded-[1.25rem] bg-[#5C2DD5] text-base font-bold uppercase";
const Nav = () => {
  const { dispatch } = useConnect4();

  const handleToggleMenu = () => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "TOGGLE_PAUSE", payload: true });
    playAudio.pause();
  };
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-[6rem] bg-[#7945FF] px-4 md:flex md:justify-center">
      <div className="mt-5 flex justify-between md:w-[650px]">
        <motion.button
          whileTap={{ scale: 0.95, rotate: "2.5deg" }}
          whileHover={{ scale: 1.05 }}
          className={menuClassName}
          onClick={handleToggleMenu}
        >
          menu
        </motion.button>
        <motion.div
          initial={{
            rotate: "0deg",
            scale: 0,
          }}
          animate={{
            rotate: "360deg",
            scale: 1,
          }}
          transition={{
            duration: 1,
            type: "spring",
            ease: "backInOut",
          }}
          exit={{
            rotate: "0deg",
            scale: 0,
          }}
        >
          <img src="images/logo.svg" alt="logo" />
        </motion.div>
        <motion.button
          whileTap={{ scale: 0.95, rotate: "2.5deg" }}
          whileHover={{ scale: 1.05 }}
          className={menuClassName}
          onClick={() => dispatch({ type: "RESET" })}
        >
          restart
        </motion.button>
      </div>
    </nav>
  );
};

export default Nav;
