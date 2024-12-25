function Log({ turns, NROW, NCOL }) {

  return (
    <ol id="log">
      {turns.map((turn) => {
        return (
          <li key={`${turn.slot.col}${turn.slot.row}`} >
            ({turn.slot.col + 1},{NROW - turn.slot.row})
            <span className={`token_player token_${turn.player}`}></span>
          </li>
        );
      })}
    </ol>
  );
}

export default Log;
