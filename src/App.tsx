import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/home/Home";
import GamePage from "./ui/game/GamePage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "game-page", element: <GamePage /> },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
