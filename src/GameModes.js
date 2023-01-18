import React, { useState } from "react";
import Game from "./Game";

const GameModes = (props) => {
  const [opacity, setOpacity] = useState(0);
  // const [mode, setMode] = useState("mode");

  const displayDesc = () => {
    setOpacity(0.8);
  };
  const hideDesc = () => {
    setOpacity(0);
  };

  const selectMode=()=>{
    props.choice('select');
  }

    return (
      <>
      <div className="game-top"></div>
        <div className="mode-cont">
          <div className="mode-div">
            <h1>GAME MODES</h1>
            <div
              className="mode-options"
              onMouseOver={displayDesc}
              onMouseOut={hideDesc}
              onClick={selectMode}
            >
              1V1 BATTLE
            </div>
            <div
              className="mode-options"
              onMouseOver={displayDesc}
              onMouseOut={hideDesc}
              onClick={selectMode}
            >
              4-PLAYER FRENZY
            </div>
            <div
              className="mode-options"
              onMouseOver={displayDesc}
              onMouseOut={hideDesc}
              onClick={selectMode}
            >
              2V2 TEAM BATTLE
            </div>
            <div
              className="mode-options"
              onMouseOver={displayDesc}
              onMouseOut={hideDesc}
              onClick={selectMode}
            >
              SQUASH MODE
            </div>
            <div
              className="mode-options"
              onMouseOver={displayDesc}
              onMouseOut={hideDesc}
              onClick={selectMode}
            >
              ONLINE MODE
            </div>
          </div>
          <div className="mode-desc" style={{ opacity: opacity + "" }}>
            <h1>HELLO MY NAME IS</h1>{" "}
          </div>
        </div>
        <div className="game-bottom"></div>
      </>
    );
};

export default GameModes;
