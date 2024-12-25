import { useState } from "react";

function Player({ initialName, token="red" , activePlayer}) {

  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName ] = useState(initialName);

  function handleEditing() {
    setIsEditing( (editing) => !editing );
  }


  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameInfo = <span className="player-name">{playerName}</span>;
  let buttonStatus = "Edit";

  if (isEditing) {
    playerNameInfo = <input type="text" required value={playerName} onChange={handleChange}/>;
    buttonStatus = "Save";
  }

  let class_token = "player token_player";

  if (token === "red") {
    class_token += " token_red";
  }

  if (token === "yellow") {
    class_token += " token_yellow";
  }

  return (
    <li className={(activePlayer == token) ? "active" : undefined} >
      {playerNameInfo}
      <span className={class_token}> </span>
      <button onClick={handleEditing}> {buttonStatus} </button>
    </li>
  );
}

export default Player;
