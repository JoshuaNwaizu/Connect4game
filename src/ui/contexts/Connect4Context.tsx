import { createContext, ReactNode, useContext, useReducer } from "react";
interface Connect4ContextType {
  gameBoard: (string | null)[][];
  currentPlayer: "red" | "yellow";
  dispatch: React.Dispatch<Action>;
  winner: null | "red" | "yellow";
  player1Score: number;
  player2Score: number;
  timer: number;
  closeModal: boolean;
  paused: boolean;
  winningCells: Cell[];
}
interface State {
  gameBoard: (string | null)[][];
  currentPlayer: "red" | "yellow";
  winner: null | "red" | "yellow";
  player1Score: number;
  timer: number;
  player2Score: number;
  closeModal: boolean;
  paused: boolean;
  winningCells: Cell[];
}
interface Action {
  type: string;
  payload?: any;
}

type Direction = {
  x: number;
  y: number;
};
type Cell = {
  row: number;
  col: number;
};
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
  winner: null,
  player1Score: 0,
  player2Score: 0,
  timer: 15,
  closeModal: false,
  paused: true,
  winningCells: [],
};

const checkWin = (
  board: (string | null)[][],
  player: "red" | "yellow",
): Cell[] | null => {
  const directions: Direction[] = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (board[row][col] === player) {
        for (let { x, y } of directions) {
          let count = 1;
          const winningCells: Cell[] = [{ row, col }];
          for (let i = 1; i < 4; i++) {
            const newRow = row + i * y;
            const newCol = col + i * x;
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < columns &&
              board[newRow][newCol] === player
            ) {
              count++;
              winningCells.push({ row: newRow, col: newCol });
            } else {
              break;
            }
          }
          if (count >= 4) {
            return winningCells;
          }
        }
      }
    }
  }
  return null;
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
      const winningCells = checkWin(newBoard, state.currentPlayer);
      const isWin = winningCells !== null;
      const newPlayer1Score =
        isWin && state.currentPlayer === "red"
          ? state.player1Score + 1
          : state.player1Score;
      const newPlayer2Score =
        isWin && state.currentPlayer === "yellow"
          ? state.player2Score + 1
          : state.player2Score;
      return {
        ...state,
        gameBoard: newBoard,
        currentPlayer: isWin
          ? state.currentPlayer
          : state.currentPlayer === "red"
            ? "yellow"
            : "red",
        winner: isWin ? state.currentPlayer : null,
        player1Score: newPlayer1Score,
        player2Score: newPlayer2Score,
        paused: false,
        winningCells: isWin ? winningCells : [],
      };

    case "START_GAME_AGAIN":
      return {
        ...state,
        gameBoard: gameBoardPiece,
        currentPlayer: "red",
        winner: null,
        timer: 15,
        winningCells: [],
      };

    case "TIMER":
      return {
        ...state,
        timer: action.payload,
      };

    case "TOGGLE_PAUSE":
      return {
        ...state,
        paused: action.payload,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        closeModal: !state.closeModal,
      };

    case "TOGGLE_MODAL":

    case "RESET":
      return {
        ...state,
        gameBoard: gameBoardPiece,
        currentPlayer: "red",
        winner: null,
        player1Score: 0,
        player2Score: 0,
        timer: 15,
        winningCells: [],
      };

    default:
      return state;
  }
};

const Connect4Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    gameBoard,
    currentPlayer,
    winner,
    player1Score,
    timer,
    player2Score,
    closeModal,
    paused,
    winningCells,
  } = state;
  return (
    <Connect4Context.Provider
      value={{
        gameBoard,
        currentPlayer,
        dispatch,
        winner,
        player1Score,
        player2Score,
        timer,
        closeModal,
        paused,
        winningCells,
      }}
    >
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
