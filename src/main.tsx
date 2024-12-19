import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Connect4Provider } from "./ui/contexts/Connect4Context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Connect4Provider>
      <App />
    </Connect4Provider>
  </StrictMode>,
);
