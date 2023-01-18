import React, { useEffect, useState, useContext } from "react";
import Corner from "./Corner.js";
import PlayerX from "./PlayerX.js";
import PlayerY from "./PlayerY.js";
import Ball from "./Ball";
import PlayerCard from "./PlayerCards.js";
import Replay from "./Replay";
import Out from "./Out.js";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import Scoreboard from "./Scoreboard.js";
import { Context } from "./App";

let gameState = "serve";

const playerColors = {
  red: { color: "rgb(255, 0, 0)", borColor: "rgb(123, 0, 0)" },
  lime: { color: "rgb(4 255 0)", borColor: "rgb(0 149 28)" },
  blue: { color: "rgb(0, 26, 255)", borColor: "rgb(0, 12, 123)" },
  yellow: { color: "rgb(230 255 0)", borColor: "rgb(183 177 1)" },
};

let keys = {
  d: false,
  g: false,
  q: false,
  a: false,
  j: false,
  l: false,
  up: false,
  down: false,
};

const pSpeed = 3;
const ballSpeed = 2.6;

const center = {
  x: 315,
  y: 315,
};
let vel = {
  x: ballSpeed,
  y: 0,
};

const criticalPlayervalues = { valueMin: 50, valueMax: 580, offSet: 10 };
const criticalCornervalues = {
  valueMin: 40,
  valueMax: 590,
  offSet: 10,
};

let currBallstate,
  currPlayerstate = [];
let ballReplay = [];
let playerReplay = [[], [], [], []];
let cornerAllow = true;
let prev = ["center", "center", "center", "center"];
let bounceAllow = [true, true, true, true];
let playerScore = [0, 0, 0, 0];
let scoreChange = [5, 5, 5, 5];
let lastTouch, missBy;

const setBallangle = (playerId, pos1) => {
  if (pos1 == 40 || pos1 == 460) {
    if (playerId == 1 || playerId == 3) vel.y = -vel.y;
    else vel.x = -vel.x;
  } else if (playerId == 1) {
    if (keys.d == true && keys.g == true) vel.y = -vel.y;
    else if (keys.d == false && keys.g == false) vel.y = -vel.y;
    else if (keys.d == true) {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = -ballSpeed * Math.cos(angle);
      vel.y = ballSpeed * Math.sin(angle);
    } else {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = ballSpeed * Math.cos(angle);
      vel.y = ballSpeed * Math.sin(angle);
    }
  } else if (playerId == 2) {
    if (keys.q == true && keys.a == true) vel.x = -vel.x;
    else if (keys.q == false && keys.a == false) vel.x = -vel.x;
    else if (keys.q == true) {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = ballSpeed * Math.sin(angle);
      vel.y = -ballSpeed * Math.cos(angle);
    } else {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = ballSpeed * Math.sin(angle);
      vel.y = ballSpeed * Math.cos(angle);
    }
  } else if (playerId == 3) {
    if (keys.j == true && keys.l == true) vel.y = -vel.y;
    else if (keys.j == false && keys.l == false) vel.y = -vel.y;
    else if (keys.j == true) {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = -ballSpeed * Math.cos(angle);
      vel.y = -ballSpeed * Math.sin(angle);
    } else {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = ballSpeed * Math.cos(angle);
      vel.y = -ballSpeed * Math.sin(angle);
    }
  } else if (playerId == 4) {
    if (keys.up == true && keys.down == true) vel.x = -vel.x;
    else if (keys.up == false && keys.down == false) vel.x = -vel.x;
    else if (keys.up == true) {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = -ballSpeed * Math.sin(angle);
      vel.y = -ballSpeed * Math.cos(angle);
    } else {
      let angle =
        Math.PI / 9 + Math.random() * ((7 * Math.PI) / 18 - Math.PI / 9);
      vel.x = -ballSpeed * Math.sin(angle);
      vel.y = ballSpeed * Math.cos(angle);
    }
  }
};

const cornerBounce = (pos) => {
  if (
    pos.x >= criticalCornervalues.valueMin + criticalCornervalues.offSet &&
    pos.y >= criticalCornervalues.valueMin + criticalCornervalues.offSet &&
    pos.x <= criticalCornervalues.valueMax - criticalCornervalues.offSet &&
    pos.y <= criticalCornervalues.valueMax - criticalCornervalues.offSet
  ) {
    cornerAllow = true;
  }

  if (
    ((pos.x < criticalCornervalues.valueMin + criticalCornervalues.offSet &&
      pos.y < criticalCornervalues.valueMin) ||
      (pos.y < criticalCornervalues.valueMin + criticalCornervalues.offSet &&
        pos.x < criticalCornervalues.valueMin) ||
      Math.sqrt(
        (pos.x - criticalCornervalues.valueMin) *
          (pos.x - criticalCornervalues.valueMin) +
          (pos.y - criticalCornervalues.valueMin) *
            (pos.y - criticalCornervalues.valueMin)
      ) < 10) &&
    cornerAllow
  ) {
    if (prev[0] == "yReg") {
      vel.y = Math.abs(vel.y);
    } else if (prev[0] == "xReg") {
      vel.x = Math.abs(vel.x);
    } else if (prev[0] == "center") {
      if (Math.abs(vel.x) == Math.abs(vel.y)) {
        vel.y = Math.abs(vel.y);
        vel.x = Math.abs(vel.x);
      } else if (Math.abs(vel.x) > Math.abs(vel.y)) {
        vel.y = Math.abs(vel.y);
      } else if (Math.abs(vel.x) < Math.abs(vel.y)) {
        vel.x = Math.abs(vel.x);
      }
    }
    cornerAllow = false;
  } else if (
    ((pos.x < criticalCornervalues.valueMin + criticalCornervalues.offSet &&
      pos.y > criticalCornervalues.valueMax) ||
      (pos.y > criticalCornervalues.valueMax - criticalCornervalues.offSet &&
        pos.x < criticalCornervalues.valueMin) ||
      Math.sqrt(
        (pos.x - criticalCornervalues.valueMin) *
          (pos.x - criticalCornervalues.valueMin) +
          (pos.y - criticalCornervalues.valueMax) *
            (pos.y - criticalCornervalues.valueMax)
      ) < 10) &&
    cornerAllow
  ) {
    if (prev[1] == "yReg") {
      vel.y = -Math.abs(vel.y);
    } else if (prev[1] == "xReg") {
      vel.x = Math.abs(vel.x);
    } else if (prev[1] == "center") {
      if (Math.abs(vel.x) == Math.abs(vel.y)) {
        vel.y = -Math.abs(vel.y);
        vel.x = Math.abs(vel.x);
      } else if (Math.abs(vel.x) > Math.abs(vel.y)) {
        vel.y = -Math.abs(vel.y);
      } else if (Math.abs(vel.x) < Math.abs(vel.y)) {
        vel.x = Math.abs(vel.x);
      }
    }
    cornerAllow = false;
  } else if (
    ((pos.x > criticalCornervalues.valueMax - criticalCornervalues.offSet &&
      pos.y > criticalCornervalues.valueMax) ||
      (pos.y > criticalCornervalues.valueMax - criticalCornervalues.offSet &&
        pos.x > criticalCornervalues.valueMax) ||
      Math.sqrt(
        (pos.x - criticalCornervalues.valueMax) *
          (pos.x - criticalCornervalues.valueMax) +
          (pos.y - criticalCornervalues.valueMax) *
            (pos.y - criticalCornervalues.valueMax)
      ) < 10) &&
    cornerAllow
  ) {
    if (prev[2] == "yReg") {
      vel.y = -Math.abs(vel.y);
    } else if (prev[2] == "xReg") {
      vel.x = -Math.abs(vel.x);
    } else if (prev[2] == "center") {
      if (Math.abs(vel.x) == Math.abs(vel.y)) {
        vel.y = -Math.abs(vel.y);
        vel.x = -Math.abs(vel.x);
      } else if (Math.abs(vel.x) > Math.abs(vel.y)) {
        vel.y = -Math.abs(vel.y);
      } else if (Math.abs(vel.x) < Math.abs(vel.y)) {
        vel.x = -Math.abs(vel.x);
      }
    }
    cornerAllow = false;
  } else if (
    ((pos.x > criticalCornervalues.valueMax - criticalCornervalues.offSet &&
      pos.y < criticalCornervalues.valueMin) ||
      (pos.y < criticalCornervalues.valueMin + criticalCornervalues.offSet &&
        pos.x > criticalCornervalues.valueMax) ||
      Math.sqrt(
        (pos.x - criticalCornervalues.valueMax) *
          (pos.x - criticalCornervalues.valueMax) +
          (pos.y - criticalCornervalues.valueMin) *
            (pos.y - criticalCornervalues.valueMin)
      ) < 10) &&
    cornerAllow
  ) {
    if (prev[3] == "yReg") {
      vel.y = Math.abs(vel.y);
    } else if (prev[3] == "xReg") {
      vel.x = -Math.abs(vel.x);
    } else if (prev[3] == "center") {
      if (Math.abs(vel.x) == Math.abs(vel.y)) {
        vel.y = Math.abs(vel.y);
        vel.x = -Math.abs(vel.x);
      } else if (Math.abs(vel.x) > Math.abs(vel.y)) {
        vel.y = Math.abs(vel.y);
      } else if (Math.abs(vel.x) < Math.abs(vel.y)) {
        vel.x = -Math.abs(vel.x);
      }
    }
    cornerAllow = false;
  }

  prevReg(0, 0, 0, pos);
  prevReg(0, 630, 1, pos);
  prevReg(630, 630, 2, pos);
  prevReg(630, 0, 3, pos);
};

const prevReg = (x, y, i, pos) => {
  if (Math.abs(pos.x - x) > Math.abs(pos.y - y)) {
    prev[i] = "xReg";
  } else if (Math.abs(pos.x - x) < Math.abs(pos.y - y)) {
    prev[i] = "yReg";
  } else if (Math.abs(pos.x - x) == Math.abs(pos.y - y)) {
    prev[i] = "center";
  }
};

const setBounce = (ind) => {
  bounceAllow = [true, true, true, true];
  bounceAllow[ind] = false;
  cornerAllow = true;
};

const bounce = (pos, [pStyle1, pStyle2, pStyle3, pStyle4]) => {
  if (
    pos.y < criticalPlayervalues.valueMin &&
    pos.y > criticalPlayervalues.valueMin - criticalPlayervalues.offSet
  ) {
    let dist1 = Math.sqrt(
      (pos.x - pStyle1.pos1) * (pos.x - pStyle1.pos1) +
        (pos.y - criticalPlayervalues.valueMin) *
          (pos.y - criticalPlayervalues.valueMin)
    );
    let dist2 = Math.sqrt(
      (pos.x - pStyle1.pos2) * (pos.x - pStyle1.pos2) +
        (pos.y - criticalPlayervalues.valueMin) *
          (pos.y - criticalPlayervalues.valueMin)
    );

    if (pStyle1.pos1 <= pos.x && pStyle1.pos2 >= pos.x && bounceAllow[0]) {
      setBallangle(1, pStyle1.pos1);
      setBounce(0);
      lastTouch = 1;
    } else if ((dist1 < 10 || dist2 < 10) && bounceAllow[0]) {
      setBallangle(1, pStyle1.pos1);
      setBounce(0);
      lastTouch = 1;
    }
  } else if (
    pos.y <=
    criticalPlayervalues.valueMin - criticalPlayervalues.offSet
  ) {
    if (Math.abs(pStyle1.pos1 - pos.x) < 10 && bounceAllow[0]) {
      if (
        (keys.d == false && keys.g == false) ||
        (keys.d == true && keys.g == true)
      )
        vel.x = -Math.abs(vel.x);
      else vel.x = -(pSpeed + 1);
      setBounce(0);
    } else if (Math.abs(pStyle1.pos2 - pos.x) < 10 && bounceAllow[0]) {
      if (
        (keys.d == false && keys.g == false) ||
        (keys.d == true && keys.g == true)
      )
        vel.x = Math.abs(vel.x);
      else vel.x = pSpeed + 1;
      setBounce(0);
    }
  }

  if (
    pos.x < criticalPlayervalues.valueMin &&
    pos.x > criticalPlayervalues.valueMin - criticalPlayervalues.offSet
  ) {
    let dist1 = Math.sqrt(
      (pos.y - pStyle2.pos1) * (pos.y - pStyle2.pos1) +
        (pos.x - criticalPlayervalues.valueMin) *
          (pos.x - criticalPlayervalues.valueMin)
    );
    let dist2 = Math.sqrt(
      (pos.y - pStyle2.pos2) * (pos.y - pStyle2.pos2) +
        (pos.x - criticalPlayervalues.valueMin) *
          (pos.x - criticalPlayervalues.valueMin)
    );

    if (pStyle2.pos1 <= pos.y && pStyle2.pos2 >= pos.y && bounceAllow[1]) {
      setBallangle(2, pStyle2.pos1);
      setBounce(1);
      lastTouch = 2;
    } else if ((dist1 < 10 || dist2 < 10) && bounceAllow[1]) {
      setBallangle(2, pStyle2.pos1);
      setBounce(1);
      lastTouch = 2;
    }
  } else if (
    pos.x <=
    criticalPlayervalues.valueMin - criticalPlayervalues.offSet
  ) {
    if (Math.abs(pStyle2.pos1 - pos.y) < 10 && bounceAllow[1]) {
      if (
        (keys.q == false && keys.a == false) ||
        (keys.q == true && keys.a == true)
      )
        vel.y = -Math.abs(vel.y);
      else vel.y = -(pSpeed + 1);
      setBounce(1);
    } else if (Math.abs(pStyle2.pos2 - pos.y) < 10 && bounceAllow[1]) {
      if (
        (keys.q == false && keys.a == false) ||
        (keys.q == true && keys.a == true)
      )
        vel.y = Math.abs(vel.y);
      else vel.y = pSpeed + 1;
      setBounce(1);
    }
  }

  if (
    pos.y > criticalPlayervalues.valueMax &&
    pos.y < criticalPlayervalues.valueMax + criticalPlayervalues.offSet
  ) {
    let dist1 = Math.sqrt(
      (pos.x - pStyle3.pos1) * (pos.x - pStyle3.pos1) +
        (pos.y - criticalPlayervalues.valueMax) *
          (pos.y - criticalPlayervalues.valueMax)
    );
    let dist2 = Math.sqrt(
      (pos.x - pStyle3.pos2) * (pos.x - pStyle3.pos2) +
        (pos.y - criticalPlayervalues.valueMax) *
          (pos.y - criticalPlayervalues.valueMax)
    );

    if (pStyle3.pos1 <= pos.x && pStyle3.pos2 >= pos.x && bounceAllow[2]) {
      setBallangle(3, pStyle3.pos1);
      setBounce(2);
      lastTouch = 3;
    } else if ((dist1 < 10 || dist2 < 10) && bounceAllow[2]) {
      setBallangle(3, pStyle3.pos1);
      setBounce(2);
      lastTouch = 3;
    }
  } else if (
    pos.y >=
    criticalPlayervalues.valueMax + criticalPlayervalues.offSet
  ) {
    if (Math.abs(pStyle3.pos1 - pos.x) < 10 && bounceAllow[2]) {
      if (
        (keys.j == false && keys.l == false) ||
        (keys.j == true && keys.l == true)
      )
        vel.x = -Math.abs(vel.x);
      else vel.x = -(pSpeed + 1);
      setBounce(2);
    } else if (Math.abs(pStyle3.pos2 - pos.x) < 10 && bounceAllow[2]) {
      if (
        (keys.j == false && keys.l == false) ||
        (keys.j == true && keys.l == true)
      )
        vel.x = Math.abs(vel.x);
      else vel.x = pSpeed + 1;
      setBounce(2);
    }
  }

  if (
    pos.x > criticalPlayervalues.valueMax &&
    pos.x < criticalPlayervalues.valueMax + criticalPlayervalues.offSet
  ) {
    let dist1 = Math.sqrt(
      (pos.y - pStyle4.pos1) * (pos.y - pStyle4.pos1) +
        (pos.x - criticalPlayervalues.valueMax) *
          (pos.x - criticalPlayervalues.valueMax)
    );
    let dist2 = Math.sqrt(
      (pos.y - pStyle4.pos2) * (pos.y - pStyle4.pos2) +
        (pos.x - criticalPlayervalues.valueMax) *
          (pos.x - criticalPlayervalues.valueMax)
    );

    if (pStyle4.pos1 <= pos.y && pStyle4.pos2 >= pos.y && bounceAllow[3]) {
      setBallangle(4, pStyle4.pos1);
      setBounce(3);
      lastTouch = 4;
    } else if ((dist1 < 10 || dist2 < 10) && bounceAllow[3]) {
      setBallangle(4, pStyle4.pos1);
      setBounce(3);
      lastTouch = 4;
    }
  } else if (
    pos.x >=
    criticalPlayervalues.valueMax + criticalPlayervalues.offSet
  ) {
    if (Math.abs(pStyle4.pos1 - pos.y) < 10 && bounceAllow[3]) {
      if (
        (keys.up == false && keys.down == false) ||
        (keys.up == true && keys.down == true)
      )
        vel.y = -Math.abs(vel.y);
      else vel.y = -(pSpeed + 1);
      setBounce(3);
    } else if (Math.abs(pStyle4.pos2 - pos.y) < 10 && bounceAllow[3]) {
      if (
        (keys.up == false && keys.down == false) ||
        (keys.up == true && keys.down == true)
      )
        vel.y = Math.abs(vel.y);
      else vel.y = pSpeed + 1;
      setBounce(3);
    }
  }
};

const findCol = (playerArray, orientInd) => {
  return playerArray.find((elem) => {
    return elem.orientation == orientInd;
  }).color;
};

const setScoreChange = (pos) => {
  if (pos.x > 620) {
    missBy = 4;
  } else if (pos.y > 620) {
    missBy = 3;
  } else if (pos.x < 10) {
    missBy = 2;
  } else if (pos.y < 10) {
    missBy = 1;
  }
  scoreChange[missBy - 1] = -5;
  scoreChange[lastTouch - 1] = 10;
  console.log(missBy, lastTouch);
};

const setScore = () => {
  playerScore.forEach((elem, index) => {
    playerScore[index] += scoreChange[index];
  });
};

const Game = () => {
  const playerArray = useContext(Context);

  const player1 = {
    pos1: 250,
    pos2: 250 + 130,
    perPos: 0,
    color: playerColors[findCol(playerArray, 0)].color,
    borColor: playerColors[findCol(playerArray, 0)].borColor,
  };

  const player2 = {
    pos1: 250,
    pos2: 250 + 130,
    perPos: 0,
    color: playerColors[findCol(playerArray, 1)].color,
    borColor: playerColors[findCol(playerArray, 1)].borColor,
  };

  const player3 = {
    pos1: 250,
    pos2: 250 + 130,
    perPos: 590,
    color: playerColors[findCol(playerArray, 2)].color,
    borColor: playerColors[findCol(playerArray, 2)].borColor,
  };

  const player4 = {
    pos1: 250,
    pos2: 250 + 130,
    perPos: 590,
    color: playerColors[findCol(playerArray, 3)].color,
    borColor: playerColors[findCol(playerArray, 3)].borColor,
  };

  const [pStyle1, setPstyle1] = useState(player1);
  const [pStyle2, setPstyle2] = useState(player2);
  const [pStyle3, setPstyle3] = useState(player3);
  const [pStyle4, setPstyle4] = useState(player4);
  const [pos, setPos] = useState(center);
  const [toRender, setTorender] = useState("game");

  currBallstate = pos;
  currPlayerstate = [pStyle1, pStyle2, pStyle3, pStyle4];

  const setDef = () => {
    setPos({ x: 50, y: 315 });
    setPstyle1(player1);
    setPstyle2(player2);
    setPstyle3(player3);
    setPstyle4(player4);
    ballReplay = [];
    playerReplay = [[], [], [], []];
    cornerAllow = true;
    prev = ["center", "center", "center", "center"];
    bounceAllow = [true, true, true, true];
    scoreChange = [5, 5, 5, 5];
  };

  const serve = (playerId) => {
    if (playerId == 1) {
      if (keys.d == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = -ballSpeed * Math.cos(angle);
        vel.y = ballSpeed * Math.sin(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      } else if (keys.g == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = ballSpeed * Math.cos(angle);
        vel.y = ballSpeed * Math.sin(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      }
    } else if (playerId == 2) {
      if (keys.q == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = ballSpeed * Math.sin(angle);
        vel.y = -ballSpeed * Math.cos(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      } else if (keys.a == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = ballSpeed * Math.sin(angle);
        vel.y = ballSpeed * Math.cos(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      }
    } else if (playerId == 3) {
      if (keys.j == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = -ballSpeed * Math.cos(angle);
        vel.y = -ballSpeed * Math.sin(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      } else if (keys.l == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = ballSpeed * Math.cos(angle);
        vel.y = -ballSpeed * Math.sin(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      }
    } else if (playerId == 4) {
      if (keys.up == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = -ballSpeed * Math.sin(angle);
        vel.y = -ballSpeed * Math.cos(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      } else if (keys.down == true) {
        let angle =
          (7 * Math.PI) / 18 +
          Math.random() * ((8 * Math.PI) / 18 - (7 * Math.PI) / 18);
        vel.x = -ballSpeed * Math.sin(angle);
        vel.y = ballSpeed * Math.cos(angle);
        gameState = "play";
        setTorender("game");
        lastTouch = playerId;
      }
    }
  };

  const play = () => {
    bounce(currBallstate, currPlayerstate);
    cornerBounce(currBallstate);
    ballReplay.push(currBallstate);
    if (ballReplay.length > 500) ballReplay.shift();
    for (let index = 0; index < 4; index++) {
      playerReplay[index].push(currPlayerstate[index]);
      if (playerReplay[index].length > 500) playerReplay[index].shift();
    }
    setPos((prev) => {
      return {
        x: prev.x + vel.x,
        y: prev.y + vel.y,
      };
    });
    if (keys.d == true) {
      setPstyle1((prev) => {
        let temp = { ...prev };
        if (temp.pos1 > 40) temp.pos1 -= pSpeed;
        temp.pos2 = temp.pos1 + 130;
        return temp;
      });
    }

    if (keys.g == true) {
      setPstyle1((prev) => {
        let temp = { ...prev };
        if (temp.pos1 < 460) temp.pos1 += pSpeed;
        temp.pos2 = temp.pos1 + 130;
        return temp;
      });
    }

    if (keys.q == true) {
      setPstyle2((prev) => {
        let temp = { ...prev };
        if (temp.pos1 > 40) temp.pos1 -= pSpeed;
        temp.pos2 = temp.pos1 + 130;
        return temp;
      });
    }

    if (keys.a == true) {
      setPstyle2((prev) => {
        let temp = { ...prev };
        if (temp.pos1 < 460) temp.pos1 += pSpeed;
        temp.pos2 = temp.pos1 + 130;
        return temp;
      });
    }

    if (keys.j == true) {
      setPstyle3((prev) => {
        let temp = { ...prev };
        if (temp.pos1 > 40) temp.pos1 -= pSpeed;
        temp.pos2 = temp.pos1 + 130;
        return temp;
      });
    }

    if (keys.l == true) {
      setPstyle3((prev) => {
        let temp = { ...prev };
        if (temp.pos1 < 460) temp.pos1 += pSpeed;
        temp.pos2 = temp.pos1 + 130;

        return temp;
      });
    }

    if (keys.up == true) {
      setPstyle4((prev) => {
        let temp = { ...prev };
        if (temp.pos1 > 40) temp.pos1 -= pSpeed;
        temp.pos2 = temp.pos1 + 130;

        return temp;
      });
    }

    if (keys.down == true) {
      setPstyle4((prev) => {
        let temp = { ...prev };
        if (temp.pos1 < 460) temp.pos1 += pSpeed;
        temp.pos2 = temp.pos1 + 130;

        return temp;
      });
    }
  };

  const outOfbounds = (pos) => {
    if (pos.x > 620 || pos.y > 620 || pos.x < 10 || pos.y < 10) {
      gameState = "halt";
      setScoreChange(pos);
      setTimeout(() => {
        setTorender("out");
      }, 1000);
      setTimeout(() => {
        gameState = "out-of-bounds";
      }, 2500);
    }
  };

  if (gameState == "play") {
    outOfbounds(currBallstate);
  }

  if (toRender == "out") {
    ballReplay.push(currBallstate);
    if (ballReplay.length > 500) ballReplay.shift();
    for (let index = 0; index < 4; index++) {
      playerReplay[index].push(currPlayerstate[index]);
      if (playerReplay[index].length > 500) playerReplay[index].shift();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState == "play") {
        play();
      } else if (gameState == "serve") {
        serve(2);
      }
    }, 1);
    window.addEventListener("keydown", (event) => {
      if (event.key == "d") keys.d = true;

      if (event.key == "g") keys.g = true;

      if (event.key == "q") keys.q = true;

      if (event.key == "a") keys.a = true;

      if (event.key == "j") keys.j = true;

      if (event.key == "l") keys.l = true;

      if (event.key == "ArrowUp") keys.up = true;

      if (event.key == "ArrowDown") keys.down = true;

      if (event.key == " ") {
        if (gameState == "out-of-bounds") {
          gameState = "halt";
          setTorender("replay");
          setTimeout(() => {
            gameState = "replay";
          }, 1000);
        } else if (gameState == "replay") {
          gameState = "halt";
          setScore();
          setTorender("scoreboard");
          setTimeout(() => {
            gameState = "scoreboard";
          }, 2000);
        } else if (gameState == "scoreboard") {
          gameState = "serve";
          setDef();
          setTorender("serve");
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      if (event.key == "d") keys.d = false;

      if (event.key == "g") keys.g = false;

      if (event.key == "q") keys.q = false;

      if (event.key == "a") keys.a = false;

      if (event.key == "j") keys.j = false;

      if (event.key == "l") keys.l = false;

      if (event.key == "ArrowUp") keys.up = false;

      if (event.key == "ArrowDown") keys.down = false;
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="game-top">{toRender == "replay" ? "REPLAY" : "3:00"}</div>
      <div className="main-div">
        <div className="card-div">
          <PlayerCard
            score={playerScore[0]}
            playerDetails={playerArray.find((elem) => {
              return elem.orientation == 0;
            })}
          />
          <PlayerCard
            score={playerScore[1]}
            playerDetails={playerArray.find((elem) => {
              return elem.orientation == 1;
            })}
          />
        </div>
        {toRender == "replay" ? (
          <Replay pos={ballReplay} player={playerReplay} />
        ) : (
          <div className="board">
            {toRender == "out" ? (
              <Out
                miss={playerArray.find((elem) => {
                  return elem.orientation == missBy - 1;
                })}
                last={playerArray.find((elem) => {
                  return elem.orientation == lastTouch - 1;
                })}
              />
            ) : (
              <></>
            )}
            {toRender == "scoreboard" ? (
              <Scoreboard score={playerScore} scoreChange={scoreChange} />
            ) : (
              <></>
            )}
            <Corner />
            <PlayerX styleProp={pStyle1} />
            <PlayerY styleProp={pStyle2} />
            <PlayerX styleProp={pStyle3} />
            <PlayerY styleProp={pStyle4} />
            <Ball pos={pos} />
          </div>
        )}
        <div className="card-div">
          <PlayerCard
            score={playerScore[3]}
            playerDetails={playerArray.find((elem) => {
              return elem.orientation == 3;
            })}
          />
          <PlayerCard
            score={playerScore[2]}
            playerDetails={playerArray.find((elem) => {
              return elem.orientation == 2;
            })}
          />
        </div>
      </div>
      <div className="game-bottom">
        <p>
          <AudiotrackIcon sx={{ fontSize: "15px" }} />
          &nbsp;&nbsp;INTERVOWEN STORIES - MONUMENT VALLEY 2&nbsp;&nbsp;
          <AudiotrackIcon sx={{ fontSize: "15px" }} />
        </p>
      </div>
    </>
  );
};

export default Game;
