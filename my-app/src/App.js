import React, { useState, useEffect } from "react";

const generateSudoku = () => {
  // Your Sudoku generation logic here
  // You can use a library or implement your own algorithm
  // For simplicity, let's assume you have a pre-generated puzzle
  const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  return puzzle;
};
function isRowValid(board, row) {
  const set = new Set();

  for (let col = 0; col < 9; col++) {
    if (
      set.has(board[row][col]) ||
      board[row][col] < 1 ||
      board[row][col] > 9
    ) {
      return false;
    }
    set.add(board[row][col]);
  }

  return true;
}

function isColValid(board, col) {
  const set = new Set();

  for (let row = 0; row < 9; row++) {
    if (
      set.has(board[row][col]) ||
      board[row][col] < 1 ||
      board[row][col] > 9
    ) {
      return false;
    }
    set.add(board[row][col]);
  }

  return true;
}

function isBoxValid(board, startRow, startCol) {
  const set = new Set();

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const num = board[startRow + row][startCol + col];
      if (set.has(num) || num < 1 || num > 9) {
        return false;
      }
      set.add(num);
    }
  }

  return true;
}

function isSudokuValid(board) {
  for (let i = 0; i < 9; i++) {
    if (!isRowValid(board, i) || !isColValid(board, i)) {
      return false;
    }
  }

  for (let startRow = 0; startRow < 9; startRow += 3) {
    for (let startCol = 0; startCol < 9; startCol += 3) {
      if (!isBoxValid(board, startRow, startCol)) {
        return false;
      }
    }
  }

  return true;
}
function App() {
  const [board, setBoard] = useState(generateSudoku());
  const [solve, setSolve] = useState(isSudokuValid(board));
  // Function to handle cell value change
  const handleCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const isSolved = isSudokuValid(board);
  // Function to reset the board
  const resetBoard = () => {
    setBoard(generateSudoku());
  };
  const solveBoard = () => {
    if (isSolved) {
      alert("Puzzle correct");
    } else {
      alert("Solve the game");
    }
  };

  return (
    <div className="flex w-full h-screen p-6 justify-center items-center">
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <table className="table-auto">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border-4 w-12 h-12 text-center">
                    <input
                      type="text"
                      value={cell === 0 ? "" : cell}
                      onChange={(e) =>
                        handleCellChange(
                          rowIndex,
                          colIndex,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={`${
                        cell !== 0 ? "bg-slate-200" : ""
                      } font-sans font-semibold text-center w-12 h-12`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={resetBoard}>Reset</button>
        <button onClick={solveBoard}>Solve</button>
      </div>
    </div>
  );
}

export default App;
