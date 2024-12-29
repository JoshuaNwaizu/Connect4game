import React from "react";

interface Score {
  img?: string;
  name?: string;
  points?: number;
  className?: string;
  scoreClassname?: string;
}
const ScoreCard: React.FC<Score> = ({
  img,
  name,
  points,
  className,
  scoreClassname,
}) => {
  return (
    <div className="relative">
      <div className="flex h-[5.0625rem] w-[8.9rem] items-center justify-center rounded-[1.25rem] bg-white uppercase text-black shadow-[0px_10px_0px_0px_#000;] md:w-[17rem] lg:h-[11.7rem] lg:w-[8.82rem] lg:flex-col">
        <img
          src={img}
          alt="logo"
          className={`absolute w-[3.375rem] ${className}`}
        />
        <p
          className={`flex flex-col items-center md:flex-row md:gap-[2.5rem] md:px-7 lg:mt-3 lg:flex-col lg:gap-0`}
        >
          <span
            className={`text-base font-bold md:text-[1.25rem] ${scoreClassname} `}
          >
            {name}
          </span>
          <span className="text-[2rem] font-bold md:text-[3.5rem]">
            {points}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;
