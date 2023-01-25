import React, { useState, useEffect, useContext } from "react";
import PlayerX from "./PlayerX";
import PlayerY from "./PlayerY";
import Ball from "./Ball";
import Corner from "./Corner";

var currBallstate,
  currPlayerstate = new Array(4);
var ind = 0;
var interval, animId;

const Replay = (props) => {
  const [pStyle1, setPstyle1] = useState(props.player[0][0]);
  const [pStyle2, setPstyle2] = useState(props.player[1][0]);
  const [pStyle3, setPstyle3] = useState(props.player[2][0]);
  const [pStyle4, setPstyle4] = useState(props.player[3][0]);
  const [pos, setPos] = useState(props.pos[0]);
  
  const animate = () => {
    setPos(currBallstate);
    setPstyle1(currPlayerstate[0]);
    setPstyle2(currPlayerstate[1]);
    setPstyle3(currPlayerstate[2]);
    setPstyle4(currPlayerstate[3]);
    animId = requestAnimationFrame(animate);
  };

  if (ind == props.pos.length) {
    clearInterval(interval);
  }
  useEffect(() => {
    currBallstate = pos;
    currPlayerstate[0] = pStyle1;
    currPlayerstate[1] = pStyle2;
    currPlayerstate[2] = pStyle3;
    currPlayerstate[3] = pStyle4;

    interval = setInterval(() => {
      if (ind < props.pos.length) {
        currBallstate = props.pos[ind];
        currPlayerstate[0] = props.player[0][ind];
        currPlayerstate[1] = props.player[1][ind];
        currPlayerstate[2] = props.player[2][ind];
        currPlayerstate[3] = props.player[3][ind];
        ind++;
      }
    }, 25);
    requestAnimationFrame(animate);
    return () => {
      ind = 0;
      clearInterval(interval);
      cancelAnimationFrame(animId);
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
