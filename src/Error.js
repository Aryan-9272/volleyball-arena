import React, { useEffect, useState } from "react";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const Error = () => {
  const [iconSize, setIconsize] = useState("85px");

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth <= 750) {
        setIconsize("60px");
      }
      if (window.innerWidth <= 520) {
        setIconsize("45px");
      }
      if (window.innerWidth > 750) {
        setIconsize("85px");
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="error-cont">
        <h1 className="error-head">
          VOLLEYBALL ARENA{" "}
          <SportsVolleyballIcon
            sx={{
              fontSize: iconSize,
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
        </h1>
        <div className="err-msg-div">
          <div className="err-msg-head">
            <ReportProblemIcon sx={{ fontSize: iconSize, color: "red" }} />
            DEVICE NOT SUPPORTED
          </div>
          <div
            className="err-msg-desc"
            style={{ animation: "appear 1s linear 0.5s forwards" }}
          >
            <p>
              THIS VERSION OF THE GAME IS ONLY COMPATIBLE WITH DEVICES THAT HAVE
              A RESOLUTION OF AT LEAST 1024x700.
            </p>
          </div>
          <div
            className="err-msg-desc"
            style={{ animation: "appear 1s linear 0.6s forwards" }}
          >
            <p>
              TRY PLAYING THIS GAME ON A LARGER DEVICE SUCH AS A PC. ALSO CONSIDER
              OPENING THE GAME IN FULL SCREEN MODE.
            </p>
          </div>
          <div
            className="err-msg-desc"
            style={{ animation: "appear 1s linear 0.7s forwards" }}
          >
            <p>
              IF THE ISSUE PERSISTS, CONSIDER REACHING OUT TO THE DEVELOPER FOR
              SUPPORT.
            </p>
          </div>
        </div>
        <div className="error-foot"></div>
      </div>
    </>
  );
};

export default Error;
