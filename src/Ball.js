import React, { useState, useEffect } from "react";


const Ball = (props) => {
  return (
    <div
      className="ball"
      style={{
        top: props.pos.y - 10 + "px",
        left: props.pos.x - 10 + "px",
      }}
    ></div>
  );
};

export default Ball;
