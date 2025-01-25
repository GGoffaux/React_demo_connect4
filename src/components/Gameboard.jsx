import { useState } from "react";

function Gameboard({ onSelectSlot, board, permission, winner }) {
  const [colForTokenToHover, setColForTokenToHover] = useState(-1);

  function onHoverToken(way, index) {
    if (way === "enter") {
      setColForTokenToHover(index);
    }
    if (way === "leave") {
      setColForTokenToHover(-1);
    }
  }

  let isTouch = false;
  if(window.matchMedia("(pointer: coarse)").matches) {
    isTouch = true;
}

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onMouseEnter={() => onHoverToken("enter", colIndex)}
                  onMouseLeave={() => onHoverToken("leave", colIndex)}
                  onClick={() => onSelectSlot(colIndex)}
                  className={`token_player ${
                    playerSymbol == "red"
                      ? "token_red"
                      : playerSymbol == "yellow"
                      ? "token_yellow"
                      : "token_default"
                  } ${
                    permission[colIndex] === rowIndex &&
                    colIndex === colForTokenToHover &&
                    isTouch === false
                      ? "token_hover"
                      : "token_boder_default"
                  } ` }
                  disabled={winner || permission[colIndex] < 0}
                >
                  {" "}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default Gameboard;

