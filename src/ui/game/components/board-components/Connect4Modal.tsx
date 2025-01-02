import React from "react";

interface Connect4ModalProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  modalClassName?: string;
}
const Connect4Modal = React.forwardRef<HTMLDivElement, Connect4ModalProps>(
  ({ title, children, className, modalClassName }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex h-[27.3125rem] w-[20.9375rem] flex-col gap-6 rounded-[2.5rem] border-[3px] border-black shadow-[0px_10px_0px_0px_#000;] ${modalClassName} `}
      >
        <div>
          <h1 className="text-center text-[3.5rem] font-bold uppercase">
            {title}
          </h1>
        </div>
        <div className={className}>{children}</div>
      </div>
    );
  },
);

export default Connect4Modal;
