import React, { useState } from "react";
import { orientationValues } from "./SelectCard";

const Lobbylist = (props) => {
  return (
    <li className="lobby-items">
      <div
        className="lobby-color"
        style={{ backgroundColor: props.playerInfo.color }}
      ></div>
      <div className="lobby-orient">
        <div
          style={orientationValues[props.playerInfo.orientation].styles}
        ></div>
      </div>
      <h3>{props.playerInfo.name}</h3>
    </li>
  );
};

const Lobby = (props) => {
  const [playerLobby, setPlayerlobby] = useState([]);
  if (playerLobby.length < props.playerArray.length) {
    setPlayerlobby(() => {
      return props.playerArray.map((currElem, ind) => {
        return <Lobbylist playerInfo={currElem} key={ind} />;
      });
    });
  }
  return <>{playerLobby}</>;
};

export default Lobby;
