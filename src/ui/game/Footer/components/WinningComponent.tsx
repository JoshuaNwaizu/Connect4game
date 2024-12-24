import { useConnect4 } from "../../../contexts/Connect4Context";

const WinningComponent = () => {
  const { winner, dispatch } = useConnect4();
  return (
    <>
      {winner && (
        <div className="flex h-[10rem] w-[17.8125rem] items-center justify-center rounded-2xl border-[3px] border-black bg-white p-4 text-2xl font-bold text-black shadow-[0px_10px_0px_0px_#000]">
          <div className="flex flex-col items-center gap-4">
            <p>{winner === "red" ? "Player1" : "Player 2"}</p>
            <p className="text-[3.5rem] uppercase">wins!</p>
            <button
              className="h-[2.44rem] w-[8.13rem] rounded-3xl bg-[#5C2DD5] text-base uppercase text-white"
              onClick={() => dispatch({ type: "START_GAME_AGAIN" })}
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WinningComponent;
