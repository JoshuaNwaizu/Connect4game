import React from "react";
import { motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const Button: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95, rotate: "2.5deg" }}
      whileHover={{ scale: 1.05 }}
      className={`${className} flex h-[4.5rem] w-[20.94rem] items-center justify-between rounded-[1.25rem] px-5 text-2xl font-bold uppercase shadow-[0px_10px_0px_0px_#000] md:w-[25rem]`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
