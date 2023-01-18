import React from "react";
import SportsIcon from "@mui/icons-material/Sports";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import Person2Icon from "@mui/icons-material/Person";
import { yellow } from "@mui/material/colors";

const Out = (props) => {
  const trfOrigin = "bottom";
  const anim = "growY";
  let missCol = props.miss.color,
    lastCol = props.last.color;
  if (missCol == "lime") missCol = "green";
  if (lastCol == "lime") lastCol = "green";

  return (
    <>
      <div
        className="out-screen"
        style={{ transformOrigin: trfOrigin, animation: `${anim} 0.7s linear` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            border: "2px solid white",
            opacity: "0",
            animation: "appear 0.7s linear 0.7s forwards",
          }}
        >
          <SportsIcon sx={{ fontSize: 100, color: "cyan" }} />
          <h1 style={{ fontSize: "60px" }}>OUT ! ! !</h1>
          <SportsScoreIcon sx={{ fontSize: 100, color: "cyan" }} />
        </div>
        <div className="out-div">
          <h1>MISS BY</h1>
          <div className="out-card">
            <Person2Icon sx={{ fontSize: "90px", color: (missCol=='yellow')?yellow[600]:missCol }} />
            <h1>{props.miss.name}</h1>
            <h1 style={{ color: "#ff0000" }}>-5</h1>
          </div>
        </div>
        <div className="out-div">
          <h1>LAST TOUCH</h1>
          <div className="out-card">
            <Person2Icon sx={{ fontSize: "90px", color: (lastCol=='yellow')?yellow[600]:lastCol }} />
            <h1>{props.last.name}</h1>
            <h1 style={{ color: "lime" }}>+10</h1>
          </div>
        </div>
        <p>PRESS SPACE TO VIEW REPLAY</p>
      </div>
    </>
  );
};

export default Out;
