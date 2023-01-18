import React, { useState, createContext } from "react";
import Title from "./Title.js";
import GameModes from "./GameModes.js";
import Select from "./Select";
import Game from "./Game.js";
import Error from "./Error.js";

let playerArray = [];
export const Context = createContext();

const App = () => {
  const [toshow, setToshow] = useState("title");
  const getPlayerArray = (arr) => {
    playerArray = arr;
  };

  if(window.innerWidth<1024||window.innerHeight<700){
    return <Error/>
  }

  const choice = (msg) => setToshow(msg);
  if (toshow == "title") return <Title choice={choice} />;
  else if (toshow == "play") return <GameModes choice={choice} />;
  else if (toshow == "select")
    return <Select choice={choice} getPlayerArray={getPlayerArray} />;
  // return <Select />;
  else if (toshow == "game")
    return (
      <Context.Provider value={playerArray}>
        <Game />
      </Context.Provider>
    );
  // return <Game/>
};

export default App;
