import { useState } from "react";

import Gameboard from "./components/Gameboard";
import Player from "./components/player";
import Log from "./components/Log";

function App() {
  //const [activePlayer0, setActivePlayer] = useState("red");
  const [ gameTurns , setGameTurns ] = useState([]);

  function handleSelectSlot(rowIndex,colIndex) {
    // setActivePlayer((prevActivePlayer) =>
    //   prevActivePlayer === "red" ? "yellow" : "red"
    // );

    setGameTurns( (prevTurns) =>  {

      let currentPlayer = "red";
      
      if (prevTurns.length > 0 && prevTurns[0].player=="red" ) {
        currentPlayer = "yellow"
      }

      const updateTurns = [ { slot:{ row : rowIndex , col : colIndex } , player : currentPlayer} , [...prevTurns]];
      return updateTurns;
    });

  }

  let activePlayer = "red";

  if (gameTurns.length > 1) {
    activePlayer = gameTurns[0].player;
  }


  return (
    <main>
      <div id="game-container">
<ol id="players" className="highlight-player">
  <Player
    initialName="Player 1"
    token="red"
    activePlayer={activePlayer}
  />
  <Player
    initialName="Player 2"
    token="yellow"
    activePlayer={activePlayer}
  />
</ol>
<Gameboard
  onSelectSlot={handleSelectSlot}
  activePlayer={activePlayer}
/>
</div>
      <Log/>
    </main>
  );
}

export default App;



