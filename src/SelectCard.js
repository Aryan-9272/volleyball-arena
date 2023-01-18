import React, { useRef, useState } from "react";

const ColorList = (props) => {
  return (
    <div
      className="colors"
      style={{ backgroundColor: props.color, border: props.border }}
      onClick={() => {
        props.onSelect(props.color);
      }}
    ></div>
  );
};

const Orientationlist = (props) => {
  return (
    <div
      className="orient"
      style={{ boxShadow: props.border }}
      onMouseOver={() => {
        props.showControls(props.id);
      }}
      onMouseOut={() => props.selectedControls()}
      onClick={() => {
        props.changeDefcontrols(props.id);
        props.onSelect(props.id);
        props.showControls(props.id);
      }}
    >
      <div style={props.style}></div>
    </div>
  );
};

const orientationValues = [
  {
    styles: {
      position: "absolute",
      backgroundColor: "white",
      width: "20px",
      height: "5px",
      top: "0px",
      left: "20px",
    },
    controls: {
      mov1: "MOVE LEFT - D",
      mov2: "MOVE RIGHT - G",
    },
  },
  {
    styles: {
      position: "absolute",
      backgroundColor: "white",
      width: "5px",
      height: "20px",
      top: "20px",
      left: "0px",
    },
    controls: {
      mov1: "MOVE UP - Q",
      mov2: "MOVE DOWN - A",
    },
  },
  {
    styles: {
      position: "absolute",
      backgroundColor: "white",
      width: "20px",
      height: "5px",
      bottom: "0px",
      left: "20px",
    },
    controls: {
      mov1: "MOVE LEFT - J",
      mov2: "MOVE RIGHT - L",
    },
  },
  {
    styles: {
      position: "absolute",
      backgroundColor: "white",
      width: "5px",
      height: "20px",
      top: "20px",
      right: "0px",
    },
    controls: {
      mov1: "MOVE UP - UP",
      mov2: "MOVE DOWN - DOWN",
    },
  },
];

let defControls = {
  mov1: "MOVEMENT BUTTON - 1",
  mov2: "MOVEMENT BUTTON - 2",
};


const SelectCard = (props) => {
  const colorSelect = (chosenColor) => {
    setColorArray((prev) => {
      return prev.map((list) => {
        if (list.props.color === chosenColor) {
          setPlayerinfo((prev) => {
            let temp = { ...prev };
            temp.color = list.props.color;
            return temp;
          });
          return (
            <ColorList
              color={list.props.color}
              key={list.props.color}
              border="3px solid white"
              onSelect={colorSelect}
            />
          );
        } else
          return (
            <ColorList
              color={list.props.color}
              key={list.props.color}
              border=""
              onSelect={colorSelect}
            />
          );
      });
    });
  };
  const orientSelect = (id) => {
    setOrientArray((prev) => {
      return prev.map((list) => {
        if (list.props.id == id) {
          setPlayerinfo((prev) => {
            let temp = { ...prev };
            temp.orientation = id;
            temp.controls = orientationValues[id].controls;
            return temp;
          });
          return (
            <Orientationlist
              style={orientationValues[list.props.id].styles}
              border="white 0 0 1px 2px"
              key={list.props.id}
              id={list.props.id}
              onSelect={orientSelect}
              selectedControls={() => setControls(defControls)}
              changeDefcontrols={(id) => {
                defControls = orientationValues[id].controls;
              }}
              showControls={() =>
                setControls(orientationValues[list.props.id].controls)
              }
            />
          );
        } else
          return (
            <Orientationlist
              style={orientationValues[list.props.id].styles}
              border=""
              key={list.props.id}
              id={list.props.id}
              onSelect={orientSelect}
              selectedControls={() => setControls(defControls)}
              changeDefcontrols={(id) => {
                defControls = orientationValues[id].controls;
              }}
              showControls={() =>
                setControls(orientationValues[list.props.id].controls)
              }
            />
          );
      });
    });
  };

  const [colorArray, setColorArray] = useState([
    <ColorList color="red" key="red" border="" onSelect={colorSelect} />,
    <ColorList color="lime" key="lime" border="" onSelect={colorSelect} />,
    <ColorList color="blue" key="blue" border="" onSelect={colorSelect} />,
    <ColorList color="yellow" key="yellow" border="" onSelect={colorSelect} />,
  ]);

  const [orientArray, setOrientArray] = useState([
    <Orientationlist
      style={orientationValues[0].styles}
      key={0}
      id={0}
      border={""}
      onSelect={orientSelect}
      selectedControls={() => setControls(defControls)}
      changeDefcontrols={(id) => {
        defControls = orientationValues[id].controls;
      }}
      showControls={() => setControls(orientationValues[0].controls)}
    />,
    <Orientationlist
      style={orientationValues[1].styles}
      key={1}
      id={1}
      border={""}
      onSelect={orientSelect}
      selectedControls={() => setControls(defControls)}
      changeDefcontrols={(id) => {
        defControls = orientationValues[id].controls;
      }}
      showControls={() => setControls(orientationValues[1].controls)}
    />,
    <Orientationlist
      style={orientationValues[2].styles}
      key={2}
      id={2}
      border={""}
      onSelect={orientSelect}
      selectedControls={() => setControls(defControls)}
      changeDefcontrols={(id) => {
        defControls = orientationValues[id].controls;
      }}
      showControls={() => setControls(orientationValues[2].controls)}
    />,
    <Orientationlist
      style={orientationValues[3].styles}
      key={3}
      id={3}
      border={""}
      onSelect={orientSelect}
      selectedControls={() => setControls(defControls)}
      changeDefcontrols={(id) => {
        defControls = orientationValues[id].controls;
      }}
      showControls={() => setControls(orientationValues[3].controls)}
    />,
  ]);

  const [contols, setControls] = useState(defControls);

  const defPlayerInfo = {
    name: "MAX 5 LETTERS",
    color: "",
    orientation: -1,
    controls: { mov1: "MOVEMENT BUTTON - 1", mov2: "MOVEMENT BUTTON - 2" },
  };
  const [playerInfo, setPlayerinfo] = useState(defPlayerInfo);

  const addPlayer = () => {
    if (playerInfo.name.length == 0) alert("Name cannot be empty");
    else if (playerInfo.name.length > 5) alert("Name cannot exceed 5 letters");
    else if (playerInfo.color.length == 0) alert("Color not picked");
    else if (playerInfo.orientation == -1) alert("Orientation not selected");
    else {
      props.addInLobby(playerInfo);
      setColorArray((prev) => {
        return prev.filter((list) => {
          return list.props.color != playerInfo.color;
        });
      });
      setOrientArray((prev) => {
        return prev.filter((list) => {
          return list.props.id != playerInfo.orientation;
        });
      });
      setPlayerinfo(defPlayerInfo);
      defControls = {
        mov1: "MOVEMENT BUTTON - 1",
        mov2: "MOVEMENT BUTTON - 2",
      };
      setControls(defControls);
      input.current.focus();
    }
  };
  const input = useRef("");
  return (
    <>
      <div className="select-card">
        <div className="select-options">
          NAME
          <input
            type="text"
            value={playerInfo.name}
            autoFocus="autofocus"
            ref={input}
            spellCheck="false"
            onChange={(e) => {
              setPlayerinfo((prev) => {
                let temp = { ...prev };
                temp.name = e.target.value.toUpperCase();
                return temp;
              });
            }}
          ></input>
        </div>
        <div className="select-options">
          COLOR
          <div className="radio-option">{colorArray}</div>
        </div>
        <div className="select-options">
          ORIENTATION
          <div className="radio-option">{orientArray}</div>
        </div>
        <div className="select-options">
          <h6>{contols.mov1}</h6>
          <h6>{contols.mov2}</h6>
        </div>
        <div className="select-card-button" onClick={addPlayer}>
          READY
        </div>
      </div>
    </>
  );
};

export default SelectCard;
export { orientationValues };
