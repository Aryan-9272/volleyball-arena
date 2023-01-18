import React, { useState, useEffect, useContext } from "react";
import PlayerX from "./PlayerX";
import PlayerY from "./PlayerY";
import Ball from "./Ball";
import Corner from "./Corner";
import { Context } from "./App";

let ind = 0,
  ind1 = 0,
  ind2 = 0,
  ind3 = 0,
  ind4 = 0;
let interval;
const Replay = (props) => {
  const [pStyle1, setPstyle1] = useState(props.player[0][0]);
  const [pStyle2, setPstyle2] = useState(props.player[1][0]);
  const [pStyle3, setPstyle3] = useState(props.player[2][0]);
  const [pStyle4, setPstyle4] = useState(props.player[3][0]);
  const [pos, setPos] = useState(props.pos[0]);
  const playerArray = useContext(Context);

  if (ind == props.pos.length) {
    clearInterval(interval);
  }
  useEffect(() => {
    interval = setInterval(() => {
      if (ind < props.pos.length) {
        setPos((prev) => {
          return {
            x: props.pos[ind].x,
            y: props.pos[ind].y,
          };
        });
        ind++;
      }
      if (ind1 < props.player[0].length) {
        setPstyle1(props.player[0][ind1]);
        ind1++;
      }
      if (ind2 < props.player[1].length) {
        setPstyle2(props.player[1][ind2]);
        ind2++;
      }
      if (ind3 < props.player[2].length) {
        setPstyle3(props.player[2][ind3]);
        ind3++;
      }
      if (ind4 < props.player[3].length) {
        setPstyle4(props.player[3][ind4]);
        ind4++;
      }
    }, 10);
    return () => {
      ind = 0;
      ind1 = 0;
      ind2 = 0;
      ind3 = 0;
      ind4 = 0;
      clearInterval(interval);
    };
  }, []);
  return (
    <>
        <div className="board">
          <Corner />
          <PlayerX styleProp={pStyle1} />
          <PlayerY styleProp={pStyle2} />
          <PlayerX styleProp={pStyle3} />
          <PlayerY styleProp={pStyle4} />
          <Ball pos={pos} />
        </div>
    </>
  );
};

export default Replay;
