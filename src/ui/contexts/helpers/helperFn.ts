import { columns, rows } from "../Connect4Context";
import { Direction, Cell } from "./interfaces";

const boardFull = (board: (string | null)[][]): boolean => {
  return board.every((row) => row.every((cell) => cell !== null));
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

const checkDiagonalWin = (
  board: (string | null)[][],
  player: "red" | "yellow",
): boolean | undefined => {
  const rows = board.length;
  const cols = board[0].length;

  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  for (let row = 3; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }
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

  let score: number = 0;
  const centerCol = Math.floor(columns / 2);
  for (let row = 0; row < rows; row++) {
    if (board[row][centerCol] === cpuPlayer) score += 3; // Encourage center
    if (board[row][centerCol] === humanPlayer) score -= 3;
  }
  // score += checkDiagonalWin(board, cpuPlayer) *10;
  score += countDiagonalThreats(board, cpuPlayer) * 10;
  score -= countDiagonalThreats(board, humanPlayer) * 10;

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

  return score;
};
const countDiagonalThreats = (
  board: (string | null)[][],
  player: "red" | "yellow",
) => {
  let count = 0;
  const rows = board.length;
  const cols = board[0].length;

  // Top-left to bottom-right (↘)
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        (board[row][col] === player || board[row][col] === null) &&
        (board[row + 1][col + 1] === player ||
          board[row + 1][col + 1] === null) &&
        (board[row + 2][col + 2] === player ||
          board[row + 2][col + 2] === null) &&
        (board[row + 3][col + 3] === player || board[row + 3][col + 3] === null)
      ) {
        count++;
      }
    }
  }

  // Bottom-left to top-right (↗)
  for (let row = 4; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        (board[row][col] === player || board[row][col] === null) &&
        (board[row - 1][col + 1] === player ||
          board[row - 1][col + 1] === null) &&
        (board[row - 2][col + 2] === player ||
          board[row - 2][col + 2] === null) &&
        (board[row - 3][col + 3] === player || board[row - 3][col + 3] === null)
      ) {
        count++;
      }
    }
  }

  return count;
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
        if (
          checkWin(newBoard, cpuPlayer) ||
          checkDiagonalWin(newBoard, cpuPlayer)
        ) {
          return { score: 100 - depth, column: col }; // Prioritize winning move
        }
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
        if (
          checkWin(newBoard, cpuPlayer) ||
          checkDiagonalWin(newBoard, cpuPlayer)
        ) {
          return { score: 100 + depth, column: col }; // Prioritize winning move
        }
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
  const columns = board[0].length;

  // Helper to simulate dropping a piece
  const simulateDrop = (col: number, player: "red" | "yellow"): boolean => {
    for (let row = board.length - 1; row >= 0; row--) {
      if (!board[row][col]) {
        board[row][col] = player;
        return true;
      }
    }
    return false;
  };

  // Helper to undo a drop
  const undoDrop = (col: number): void => {
    for (let row = 0; row < board.length; row++) {
      if (board[row][col]) {
        board[row][col] = null;
        return;
      }
    }
  };

  // Check for winning moves
  for (let col = 0; col < columns; col++) {
    if (!board[0][col]) {
      // Check if CPU can win
      simulateDrop(col, cpuPlayer);
      if (checkWin(board, cpuPlayer)) {
        undoDrop(col);
        return col; // Winning move
      }
      undoDrop(col);

      // Check if Human can win (block them)
      simulateDrop(col, humanPlayer);
      if (checkWin(board, humanPlayer)) {
        undoDrop(col);
        return col; // Blocking move
      }
      undoDrop(col);
    }
  }

  // Play randomly in valid columns
  const validColumns: number[] = [];
  for (let col = 0; col < columns; col++) {
    if (!board[0][col]) validColumns.push(col);
  }
  if (validColumns.length > 0) {
    return validColumns[Math.floor(Math.random() * validColumns.length)];
  }

  return null; // No valid moves
};

export {
  checkWin,
  dropPiece,
  checkDiagonalWin,
  evaluateBoard,
  findBestMove,
  boardFull,
};
