import React from "react";

const PlayerX = (props) => {
  const style={
    top:props.styleProp.perPos+"px",
    left:props.styleProp.pos1+"px",
    backgroundColor:props.styleProp.color,
    borderColor:props.styleProp.borColor
  }
  return <div className="player-x" style={style}></div>;
};
export default PlayerX;
