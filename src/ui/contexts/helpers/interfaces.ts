export interface Connect4ContextType {
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

export interface State {
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

export interface Action {
  type: string;
  payload?: any;
}

export type Direction = {
  x: number;
  y: number;
};

export type Cell = {
  row: number;
  col: number;
};
