function Gameover({ winner , onRestart }) {
  return (
    <div id="game-over">
      {winner && <p>Game Over ! : {winner} won ! </p>}
      {!winner && <p>Game Over ! : It is a draw ! </p>}
      <p>
        <button onClick={onRestart} >Rematch!</button>
      </p>
    </div>
  );
}

export default Gameover;
