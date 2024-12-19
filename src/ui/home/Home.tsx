import Button from "./components/Button";

const Home = () => {
  return (
    <section className="flex h-svh w-svw flex-col items-center justify-center gap-[4rem]">
      <div>
        <img src="images/logo.svg" alt="logo" />
      </div>

      <div className="flex flex-col gap-6">
        <Button className="bg-[#FD6687] text-white">
          <p>play vs cpu</p>
          <img src="/images/player-vs-cpu.svg" alt="play vs cpu" />
        </Button>
        <Button className="bg-[#FFCE67] text-black">
          <p>play vs player</p>
          <img src="public/images/player-vs-player.svg" alt="play vs player" />
        </Button>
        <Button className="bg-white text-black">
          <p>game rules</p>
        </Button>
      </div>
    </section>
  );
};

export default Home;
