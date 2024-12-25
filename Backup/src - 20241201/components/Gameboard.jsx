import { useState } from "react";

const initialGameBoard = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

function Gameboard({ onSelectSlot, activePlayer }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSlotStatus(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updateGameBoard = [...prevGameBoard.map((row) => [...row])];
      updateGameBoard[rowIndex][colIndex] = activePlayer;
      onSelectSlot(rowIndex, colIndex);
      return updateGameBoard;
    });
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleSlotStatus(rowIndex, colIndex)}
                  className={`token_player ${
                    playerSymbol == "red"
                      ? "token_red"
                      : playerSymbol == "yellow"
                      ? "token_yellow"
                      : "token_default"
                  }`}
                ></button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default Gameboard;

