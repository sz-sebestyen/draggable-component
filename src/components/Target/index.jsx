import React from "react";
import "./style.css";

function Target() {
  return (
    <div
      className="target"
      style={{
        width: "120px",
        height: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Grab me!
    </div>
  );
}

export default Target;
