import React, { useState } from "react";
import SelectCard from "./SelectCard";
import Lobby from "./Lobby";

const Select = (props) => {
  const [playerArray, setPlayerArray] = useState([]);
  const addPlayerList = (playerInfo) => {
    setPlayerArray((prev) => {
      return [...prev, playerInfo];
    });
  };
  return (
    <>
      <div className="game-top"></div>
      <div className="select-cont">
        <h1>PLAYER SELECT</h1>
        <div className="select-card-div">
          {playerArray.length < 4 ? (
            <SelectCard addInLobby={addPlayerList} />
          ) : (
            <></>
          )}
          <div className="lobby">
            <h3>LOBBY</h3>
            <ul className="lobby-list">
              <Lobby playerArray={playerArray} />
            </ul>
            {playerArray.length == 4 ? (
              <div
                className="select-card-button"
                onClick={() => {
                  props.getPlayerArray(playerArray);
                  props.choice("game");
                }}
              >
                READY
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="game-bottom"></div>
    </>
  );
};

export default Select;
