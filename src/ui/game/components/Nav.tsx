import { useConnect4 } from "../../contexts/Connect4Context";

const menuClassName: string =
  "h-[2.44rem] w-[6.75rem] rounded-[1.25rem] bg-[#5C2DD5] text-base font-bold uppercase";
const Nav = () => {
  const { dispatch } = useConnect4();

  const handleToggleMenu = () => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "TOGGLE_PAUSE", payload: true });
  };
  return (
    <nav>
      <div className="mt-5 flex justify-between">
        <button className={menuClassName} onClick={handleToggleMenu}>
          menu
        </button>
        <div>
          <img src="images/logo.svg" alt="logo" />
        </div>
        <button
          className={menuClassName}
          onClick={() => dispatch({ type: "RESET" })}
        >
          restart
        </button>
      </div>
    </nav>
  );
};

export default Nav;
