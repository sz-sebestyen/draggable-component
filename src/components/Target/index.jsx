import React, { forwardRef } from "react";
import "./style.css";

const Target = forwardRef(({ style, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className="target"
      style={{
        width: "120px",
        height: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      Grab me!
    </div>
  );
});

export default Target;
