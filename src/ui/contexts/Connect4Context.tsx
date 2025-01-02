import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  boardFull,
  checkDiagonalWin,
  checkWin,
  findBestMove,
} from "./helpers/helperFn";
import { Action, Connect4ContextType, State } from "./helpers/interfaces";

const Connect4Context = createContext<Connect4ContextType | undefined>(
  undefined,
);

export const rows: number = 6;
export const columns: number = 7;
const gameBoardPiece: null[][] = Array.from({ length: rows }, () =>
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
  gameMode: localStorage.getItem("gameMode") as "player" | "cpu",
  deActivateBoard: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DROP_PIECE":
      const newBoard = state.gameBoard.map((row) => [...row]);
      for (let row = rows - 1; row >= 0; row--) {
        if (!newBoard[row][action.payload]) {
          newBoard[row][action.payload] = state.currentPlayer;
          break;
        }
      }
      const winningCells = checkWin(newBoard, state.currentPlayer);
      const diagonalWin = checkDiagonalWin(newBoard, state.currentPlayer);

      const isWin = !!diagonalWin || winningCells;

      const newPlayer1Score =
        isWin && state.currentPlayer === "red"
          ? state.player1Score + 1
          : state.player1Score;
      const newPlayer2Score =
        isWin && state.currentPlayer === "yellow"
          ? state.player2Score + 1
          : state.player2Score;

      let nextPlayer: "red" | "yellow" =
        state.currentPlayer === "red" ? "yellow" : "red";
      if (boardFull(newBoard)) {
        return {
          ...state,
          gameBoard: gameBoardPiece,
          currentPlayer: nextPlayer,
          winner: isWin ? state.currentPlayer : null,
          winningCells: winningCells || [],
          deActivateBoard: true,
        };
      }

      return {
        ...state,
        gameBoard: newBoard,
        currentPlayer: isWin ? state.currentPlayer : nextPlayer,
        winner: isWin ? state.currentPlayer : null,
        player1Score: newPlayer1Score,
        player2Score: newPlayer2Score,
        paused: false,
        winningCells: winningCells || [],
        deActivateBoard: nextPlayer === "yellow" && state.gameMode === "cpu",
      };

    case "CPU_MOVE":
      const { newBoard: updatedBoard, winner, currentPlayer } = action.payload;
      if (state.paused) return { ...state, deActivateBoard: false };
      if (boardFull(updatedBoard)) {
        return {
          ...state,
          gameBoard: gameBoardPiece,
          winner: null,
          winningCells: [],
          deActivateBoard: true,
          // paused: false,
        };
      }
      return {
        ...state,
        gameBoard: updatedBoard,
        currentPlayer,
        winner,
        winningCells: action.payload.winningCells,
        player1Score: action.payload.player1Score,
        player2Score: action.payload.player2Score,
        deActivateBoard: /*!!winner,*/ false,
      };

    case "START_GAME_AGAIN":
      return {
        ...state,
        gameBoard: gameBoardPiece,
        currentPlayer: "red",
        winner: null,
        timer: 15,
        winningCells: [],
        deActivateBoard: false,
      };

    case "SET_GAME_MODE":
      localStorage.setItem("gameMode", action.payload);
      return {
        ...state,
        gameMode: action.payload,
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
    case "DEACTIVATE_BOARD":
      const checkWinner = checkWin(state.gameBoard, state.currentPlayer);
      if (checkWinner) {
        return {
          ...state,
          deActivateBoard: true,
        };
      }
      return state;
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
        deActivateBoard: false,
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
    player2Score,
    timer,
    closeModal,
    paused,
    winningCells,
    gameMode,
    deActivateBoard,
  } = state;
  useEffect(() => {
    if (gameMode === "cpu" && currentPlayer === "yellow" && !winner) {
      const randomTime = Math.floor(Math.random() * 3) + 1;
      const cpuMoveTimeout = setTimeout(() => {
        const cpuMove = findBestMove(gameBoard, "yellow", "red");
        if (cpuMove !== null) {
          const newBoard = gameBoard.map((row) => [...row]);
          for (let row = rows - 1; row >= 0; row--) {
            if (!newBoard[row][cpuMove]) {
              newBoard[row][cpuMove] = "yellow";
              break;
            }
          }
          const cpuWinningCells = checkWin(newBoard, "yellow");
          const cpuIsWin = cpuWinningCells !== null;
          dispatch({
            type: "CPU_MOVE",
            payload: {
              newBoard,
              currentPlayer: "red",
              winner: cpuIsWin ? "yellow" : null,
              player1Score,
              player2Score: cpuIsWin ? player2Score + 1 : player2Score,
              winningCells: cpuIsWin ? cpuWinningCells : [],
            },
          });
        }
      }, randomTime * 1000); // Delay CPU move by random second

      return () => clearTimeout(cpuMoveTimeout);
    }
  }, [gameBoard, currentPlayer, gameMode, winner, player1Score, player2Score]);
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
        gameMode,
        deActivateBoard,
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
