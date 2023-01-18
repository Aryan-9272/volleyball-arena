import React from "react";

const PlayerY = (props) => {
  const style = {
    left:props.styleProp.perPos+"px",
    top:props.styleProp.pos1+"px",
    backgroundColor:props.styleProp.color,
    borderColor:props.styleProp.borColor
  };
  return <div className="player-y" style={style}></div>;
};
export default PlayerY;
