import React from "react";

interface Score {
  img?: string;
  name?: string;
  points?: number;
  className?: string;
}
const ScoreCard: React.FC<Score> = ({ img, name, points, className }) => {
  return (
    <div className="relative">
      <div className="flex h-[5.0625rem] w-[8.9rem] items-center justify-center rounded-[1.25rem] bg-white uppercase text-black shadow-[0px_10px_0px_0px_#000;]">
        <img
          src={img}
          alt="logo"
          className={`absolute w-[3.375rem] ${className}`}
        />
        <p className="flex flex-col items-center">
          <span className="text-base font-bold">{name}</span>
          <span className="text-[2rem] font-bold">{points}</span>
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;
