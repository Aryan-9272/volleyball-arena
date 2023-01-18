import React from "react";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";


const Title = (props) => {
  return (
    <>
      <div className="game-top"></div>
      <div className="title-div">
        <div className="title-cont">
          <h1>VOLLEYBALL ARENA</h1>
          <SportsVolleyballIcon
            sx={{
              fontSize: 100,
              color: "cyan",
              animation: "spin 2s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />
        </div>
        <div className="title-options" onClick={() => props.choice("play")}>
          <h1>PLAY</h1>
        </div>
        <div className="title-options" onClick={() => props.choice("options")}>
          <h1>OPTIONS</h1>
        </div>
        <div className="title-options" onClick={() => props.choice("credits")}>
          <h1>CREDITS</h1>
        </div>
      </div>
      <div className="game-bottom"></div>
    </>
  );
};

export default Title;
