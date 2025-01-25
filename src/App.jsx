import { useState } from "react";

import { WINNING_COMBINATIONS } from "./assets/winning_combinations";

import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/Gameover";

const NCOL = 7;
const NROW = 6;

const PLAYERS = { red: "Player 1", yellow: "Player 2" };

const INTIAL_GAME_BOARD = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstToken = gameBoard[combination[0].row][combination[0].column];
    const secondToken = gameBoard[combination[1].row][combination[1].column];
    const thirdToken = gameBoard[combination[2].row][combination[2].column];
    const fourthToken = gameBoard[combination[3].row][combination[3].column];

    if (
      firstToken &&
      firstToken === secondToken &&
      firstToken === thirdToken &&
      firstToken === fourthToken
    ) {
      winner = firstToken;
    }
  }
  return winner;
}

function deriveActivePlayer(gameTurns) {
  let activePlayer = "red";

  if (gameTurns.length > 0 && gameTurns[0].player == "red") {
    activePlayer = "yellow";
  }

  return activePlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INTIAL_GAME_BOARD].map((row) => [...row]);

  for (const turn of gameTurns) {
    const { slot, player } = turn;
    const { row, col } = slot;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [permission, setPermission] = useState([
    NROW - 1,
    NROW - 1,
    NROW - 1,
    NROW - 1,
    NROW - 1,
    NROW - 1,
    NROW - 1,
  ]);
  const [players, setPlayers] = useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === NCOL * NROW && !winner;

  function handleSelectSlot(colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const turn = {
        slot: { row: permission[colIndex], col: colIndex },
        player: currentPlayer,
      };

      let updateTurns = [turn, ...prevTurns];

      return updateTurns;
    });
    setPermission((prevPermission) => {
      const updatePermission = [...prevPermission];
      updatePermission[colIndex] = prevPermission[colIndex] - 1;

      return updatePermission;
    });
  }

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleRestart() {
    setGameTurns([]);
    setPermission([
      NROW - 1,
      NROW - 1,
      NROW - 1,
      NROW - 1,
      NROW - 1,
      NROW - 1,
      NROW - 1,
    ]);
  }

  function handlePlayerChangeName(color, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [color]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName = {PLAYERS.red}
            token="red"
            activePlayer={activePlayer}
            onChangeName={handlePlayerChangeName}
          />
          <Player
            initialName={PLAYERS.yellow}
            token="yellow"
            activePlayer={activePlayer}
            onChangeName={handlePlayerChangeName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={players[winner]} onRestart={handleRestart} />
        )}
        <Gameboard
          onSelectSlot={handleSelectSlot}
          board={gameBoard}
          permission={permission}
          winner={winner}
        />
      </div>
      <Log turns={gameTurns} NCOL={NCOL} NROW={NROW} />
    </main>
  );
}

export default App;
