const menuClassName: string =
  "h-[2.44rem] w-[6.75rem] rounded-[1.25rem] bg-[#5C2DD5] text-base font-bold uppercase";
const Nav = () => {
  return (
    <nav>
      <div className="my-8 flex justify-between">
        <button className={menuClassName}>menu</button>
        <div>
          <img src="images/logo.svg" alt="logo" />
        </div>
        <button className={menuClassName}>restart</button>
      </div>
    </nav>
  );
};

export default Nav;
