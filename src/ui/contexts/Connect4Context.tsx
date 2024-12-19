import { createContext, ReactNode, useContext, useReducer } from "react";
interface Connect4ContextType {
  gameBoard: (string | null)[][];
  currentPlayer: "red" | "yellow";
  dispatch: React.Dispatch<Action>;
}
interface State {
  gameBoard: (string | null)[][];
  currentPlayer: "red" | "yellow";
}
interface Action {
  type: string;
  payload?: any;
}

const Connect4Context = createContext<Connect4ContextType | undefined>(
  undefined,
);

const rows = 6;
const columns = 7;
const gameBoardPiece = Array.from({ length: rows }, () =>
  Array(columns).fill(null),
);
const initialState: State = {
  gameBoard: gameBoardPiece,
  currentPlayer: "red",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DROP_PIECE":
      // const newBoard = [...state.gameBoard];
      const newBoard = state.gameBoard.map((row) => [...row]);
      for (let row = rows - 1; row >= 0; row--) {
        if (!newBoard[row][action.payload]) {
          newBoard[row][action.payload] = state.currentPlayer;
          break;
        }
      }
      return {
        gameBoard: newBoard,
        currentPlayer: state.currentPlayer === "red" ? "yellow" : "red",
      };

    default:
      return state;
  }
};

const Connect4Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { gameBoard, currentPlayer } = state;
  return (
    <Connect4Context.Provider value={{ gameBoard, currentPlayer, dispatch }}>
      {children}
    </Connect4Context.Provider>
  );
};

const useConnect4 = (): Connect4ContextType => {
  const context = useContext(Connect4Context);
  if (!context) {
    throw new Error("useConnect4 must be used within a Connect4Provider");
  }
  return context;
};

export { Connect4Provider, useConnect4 };
