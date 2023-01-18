import React from "react";
import Person2Icon from "@mui/icons-material/Person";

const PlayerCard = (props) => {
  // console.log(props);
  let fontSize = 80;
  if (window.innerWidth < 1375) fontSize = 60;
  if (window.innerWidth < 1110) fontSize = 50;

  return (
    <>
      <div className="player-card">
        <div className="card-rows name-div">
          <Person2Icon
            sx={{
              fontSize: { fontSize },
              color: props.playerDetails.color,
            }}
          />
          <h1>{props.playerDetails.name}</h1>
        </div>
        <div className="card-rows control-div">
          {props.playerDetails.orientation == 3 ? (
            <>
              <h2>
                MOVE UP - <span className="key">&#8593;</span>
              </h2>
              <h2>
                MOVE DOWN - <span className="key">&#8595;</span>
              </h2>
            </>
          ) : (
            <>
              <h2>{props.playerDetails.controls.mov1}</h2>
              <h2>{props.playerDetails.controls.mov2}</h2>
            </>
          )}
        </div>
        <div className="card-rows">
          <h1>SCORE</h1>
          <h1>{props.score}</h1>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
