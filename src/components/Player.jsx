import { useState } from "react";

function Player({ initialName, token = "red", activePlayer , onChangeName}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditing() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(token,playerName);
    }

  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameInfo = <span className="player-name">{playerName}</span>;
  let buttonStatus = "Edit";

  if (isEditing) {
    playerNameInfo = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    buttonStatus = "Save";
  }

  return (
    <li className={activePlayer == token ? "active" : undefined}>
      {playerNameInfo}
      <span className={` player token_player token_${token}`}> </span>
      <button onClick={handleEditing}> {buttonStatus} </button>
    </li>
  );
}

export default Player;
