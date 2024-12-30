import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

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
  gameMode: "player" | "cpu";
  deActivateBoard: boolean;
}

interface State {
  gameBoard: (string | null)[][];
  currentPlayer: "red" | "yellow";
  winner: null | "red" | "yellow";
  player1Score: number;
  player2Score: number;
  timer: number;
  closeModal: boolean;
  paused: boolean;
  winningCells: Cell[];
  gameMode: "player" | "cpu";
  deActivateBoard: boolean;
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
  gameMode: localStorage.getItem("gameMode") as "player" | "cpu",
  deActivateBoard: false,
};

console.log(initialState);

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

// computer
const dropPiece = (
  board: (string | null)[][],
  col: number,
  player: "red" | "yellow",
): boolean => {
  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = player;
      return true;
    }
  }
  return false;
};

const evaluateBoard = (
  board: (string | null)[][],
  cpuPlayer: "red" | "yellow",
  humanPlayer: "red" | "yellow",
): number => {
  const cpuWin = checkWin(board, cpuPlayer);
  const humanWin = checkWin(board, humanPlayer);

  if (cpuWin) return 100; // CPU wins
  if (humanWin) return -100; // Human wins

  let score = 0;

  // Add scoring for rows, columns, and diagonals with potential for winning
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (board[row][col] === cpuPlayer) {
        score += 10; // Favor CPU positions
      } else if (board[row][col] === humanPlayer) {
        score -= 10; // Penalize human positions
      }
    }
  }
  // console.log(score);
  return score;
};

const minimax = (
  board: (string | null)[][],
  depth: number,
  isMaximizing: boolean,
  cpuPlayer: "red" | "yellow",
  humanPlayer: "red" | "yellow",
): { score: number; column: number | null } => {
  const cpuWin = checkWin(board, cpuPlayer);
  const humanWin = checkWin(board, humanPlayer);
  if (cpuWin) return { score: 100 - depth, column: null };
  if (humanWin) return { score: -100 + depth, column: null };
  if (boardFull(board)) return { score: 0, column: null };

  if (depth === 0) {
    return {
      score: evaluateBoard(board, cpuPlayer, humanPlayer),
      column: null,
    };
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    let bestColumn = null;
    for (let col = 0; col < columns; col++) {
      if (!board[0][col]) {
        const newBoard = board.map((row) => [...row]);
        dropPiece(newBoard, col, cpuPlayer);
        const { score } = minimax(
          newBoard,
          depth - 1,
          false,
          cpuPlayer,
          humanPlayer,
        );
        if (score > maxScore) {
          maxScore = score;
          bestColumn = col;
        }
      }
    }
    return { score: maxScore, column: bestColumn };
  } else {
    let minScore = Infinity;
    let bestColumn = null;
    for (let col = 0; col < columns; col++) {
      if (!board[0][col]) {
        const newBoard = board.map((row) => [...row]);
        dropPiece(newBoard, col, humanPlayer);
        const { score } = minimax(
          newBoard,
          depth - 1,
          true,
          cpuPlayer,
          humanPlayer,
        );
        if (score < minScore) {
          minScore = score;
          bestColumn = col;
        }
      }
    }
    return { score: minScore, column: bestColumn };
  }
};

const findBestMove = (
  board: (string | null)[][],
  cpuPlayer: "red" | "yellow",
  humanPlayer: "red" | "yellow",
): number | null => {
  const depth = 6; // Increase for harder CPU, decrease for faster responses
  const { column } = minimax(board, depth, true, cpuPlayer, humanPlayer);
  return column;
  // Try to win
  // for (let col = 0; col < columns; col++) {
  //   const simulatedBoard = board.map((row) => [...row]);
  //   if (dropPiece(simulatedBoard, col, cpuPlayer)) {
  //     if (checkWin(simulatedBoard, cpuPlayer)) {
  //       return col; // Winning move
  //     }
  //   }
  // }

  // Try to block human
  // for (let col = 0; col < columns; col++) {
  //   const simulatedBoard = board.map((row) => [...row]);
  //   if (dropPiece(simulatedBoard, col, humanPlayer)) {
  //     if (checkWin(simulatedBoard, humanPlayer)) {
  //       return col; // Blocking move
  //     }
  //   }
  // }

  // Pick a random valid column
  // const validColumns = [];
  // for (let col = 0; col < columns; col++) {
  //   if (!board[0][col]) {
  //     validColumns.push(col);
  //   }
  // }
  // return validColumns.length > 0
  // ? validColumns[Math.floor(Math.random() * validColumns.length)]
  //   : null;
};

const boardFull = (board: (string | null)[][]): boolean => {
  return board.every((row) => row.every((cell) => cell !== null));
};
// const colFull = (board: (string | null)[][], col: number): boolean => {
//   return board[0][col] !== null;
// };

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
      const isWin = winningCells !== null;

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
          winningCells: isWin ? winningCells : [],
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
        winningCells: isWin ? winningCells : [],
        deActivateBoard: nextPlayer === "yellow" && state.gameMode === "cpu",
      };

    case "CPU_MOVE":
      const { newBoard: updatedBoard, winner, currentPlayer } = action.payload;
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
      console.log(randomTime);
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
