import React, { useContext } from "react";
import Person2Icon from "@mui/icons-material/Person";
import { Context } from "./App";

const Scoreboard = (props) => {
  const playerArray = useContext(Context);
  let playerScoreArray = playerArray.map((elem, index) => {
    let obj = {
      ...elem,
      score: props.score[index],
      scoreChange: props.scoreChange[index],
    };
    if (elem.color == "lime") obj.color = "green";
    if (elem.color == "yellow") obj.color = "#fdd835";
    return obj;
  });

  playerScoreArray.sort((a, b) => {
    return b.score - a.score;
  });

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
            <Person2Icon
              sx={{ fontSize: "85px", color: playerScoreArray[0].color }}
            />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>{playerScoreArray[0].name}</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>{playerScoreArray[0].score}</h1>
              <span
                style={{
                  color:
                    playerScoreArray[0].scoreChange >= 0 ? "lime" : "#ff0000",
                }}
              >
                {playerScoreArray[0].scoreChange >= 0 ? "+" : ""}
                {playerScoreArray[0].scoreChange}
              </span>
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
            <Person2Icon
              sx={{ fontSize: "85px", color: playerScoreArray[1].color }}
            />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>{playerScoreArray[1].name}</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>{playerScoreArray[1].score}</h1>
              <span
                style={{
                  color:
                    playerScoreArray[1].scoreChange >= 0 ? "lime" : "#ff0000",
                }}
              >
                {playerScoreArray[1].scoreChange >= 0 ? "+" : ""}
                {playerScoreArray[1].scoreChange}
              </span>
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
            <Person2Icon
              sx={{ fontSize: "85px", color: playerScoreArray[2].color }}
            />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>{playerScoreArray[2].name}</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>{playerScoreArray[2].score}</h1>
              <span
                style={{
                  color:
                    playerScoreArray[2].scoreChange >= 0 ? "lime" : "#ff0000",
                }}
              >
                {playerScoreArray[2].scoreChange >= 0 ? "+" : ""}
                {playerScoreArray[2].scoreChange}
              </span>
            </div>
          </div>
        </div>
        <div
          className="out-div"
          style={{ height: "20%", animation: "appear 0.8s linear 1s forwards" }}
        >
          <div className="out-card" style={{ height: "100%" }}>
            <h1>4</h1>
            <Person2Icon
              sx={{ fontSize: "85px", color: playerScoreArray[3].color }}
            />
            <div style={{ ...flexStyle, width: "40%" }}>
              <h2>{playerScoreArray[3].name}</h2>
            </div>
            <div
              style={{ ...flexStyle, width: "15%", flexDirection: "column" }}
            >
              <h1>{playerScoreArray[3].score}</h1>
              <span
                style={{
                  color:
                    playerScoreArray[3].scoreChange >= 0 ? "lime" : "#ff0000",
                }}
              >
                {playerScoreArray[3].scoreChange >= 0 ? "+" : ""}
                {playerScoreArray[3].scoreChange}
              </span>
            </div>
          </div>
        </div>
        <p>PRESS SPACE TO CONTINUE</p>
      </div>
    </>
  );
};

export default Scoreboard;
