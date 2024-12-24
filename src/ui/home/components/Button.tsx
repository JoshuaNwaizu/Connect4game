import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const Button: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      className={`${className} flex h-[4.5rem] w-[20.94rem] items-center justify-between rounded-[1.25rem] px-5 text-2xl font-bold uppercase shadow-[0px_10px_0px_0px_#000]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
