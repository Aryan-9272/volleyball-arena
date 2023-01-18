import React from "react";
import Person2Icon from "@mui/icons-material/Person";
import { yellow } from "@mui/material/colors";

const Scoreboard = () => {
  let flexStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <div className="out-screen">
        <h1>SCOREBOARD</h1>
        <div
          className="out-div"
          style={{
            height: "20%",
            animation: "appear 0.7s linear 0.5s forwards",
          }}
        >
          <div className="out-card" style={{ height: "100%" }}>
            <h1>1</h1>
            <Person2Icon sx={{ fontSize: "85px", color: "green" }} />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>WWWWW</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>4</h1>
              <span style={{ color: "lime" }}>+10</span>
            </div>
          </div>
        </div>
        <div
          className="out-div"
          style={{
            height: "20%",
            animation: "appear 0.7s linear 0.6s forwards",
          }}
        >
          <div className="out-card" style={{ height: "100%" }}>
            <h1>2</h1>
            <Person2Icon sx={{ fontSize: "85px", color: "red" }} />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>WWWWW</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>40</h1>
              <span style={{ color: "lime" }}>+10</span>
            </div>
          </div>
        </div>
        <div
          className="out-div"
          style={{
            height: "20%",
            animation: "appear 0.7s linear 0.7s forwards",
          }}
        >
          <div className="out-card" style={{ height: "100%" }}>
            <h1>3</h1>
            <Person2Icon sx={{ fontSize: "85px", color: "blue" }} />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>WWWWW</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>4</h1>
              <span style={{ color: "lime" }}>+10</span>
            </div>
          </div>
        </div>
        <div
          className="out-div"
          style={{ height: "20%", animation: "appear 0.8s linear 1s forwards" }}
        >
          <div className="out-card" style={{ height: "100%" }}>
            <h1>4</h1>
            <Person2Icon sx={{ fontSize: "85px", color: yellow[600] }} />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>WWWWW</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>4</h1>
              <span style={{ color: "#ff0000" }}>-5</span>
            </div>
          </div>
        </div>
        <p>PRESS SPACE TO CONTINUE</p>
      </div>
    </>
  );
};

export default Scoreboard;
