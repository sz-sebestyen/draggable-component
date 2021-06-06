import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";
import mouseTracker from "./mouseTracker";

function Hoc(Component) {
  const [xOffset, setXoffset] = useState(null);
  const [yOffset, setYoffset] = useState(null);

  const [isDragged, setIsDragged] = useState(false);

  const subIdRef = useRef(null);
  const mainRef = useRef(null);

  const start = (event) => {
    const box = event.target.getBoundingClientRect();
    setYoffset(mouseTracker.getY() - box.y);
    setXoffset(mouseTracker.getX() - box.x);
    setIsDragged(true);

    mainRef.current.style.transition = "top 0s, left 0s";
    mainRef.current.style.position = "fixed";
  };

  useEffect(() => {
    if (isDragged) {
      subIdRef.current = mouseTracker.subscibe(updateCoords);
    } else {
      mouseTracker.unsubscribe(subIdRef.current);
    }
  }, [isDragged]); // eslint-disable-line

  const end = () => {
    setIsDragged(false);

    mainRef.current.style.transition = "";
    mainRef.current.style.position = "";
    mainRef.current.style.top = "";
    mainRef.current.style.left = "";
  };

  const updateCoords = (x, y) => {
    // TODO: prevent from leaving client

    // const correctX = x - xOffset;
    // const correctY = y - yOffset;

    // const limitX = correctX < 0 ? 0 : correctX;

    mainRef.current.style.left = `${x - xOffset}px`;
    mainRef.current.style.top = `${y - yOffset}px`;
  };

  useEffect(() => {
    window.addEventListener("mouseup", end);
    return () => {
      mouseTracker.ussubscribe(subIdRef.current);
      window.removeEventListener("mouseup", end);
    };
  }, []);

  return useCallback(
    ({ style = {} }) => (
      <Component
        ref={mainRef}
        onDragStart={(event) => event.preventDefault()}
        onMouseDown={start}
        style={{
          ...style,
          // position: "fixed",
          cursor: "grab",
        }}
      />
    ),
    []
  );
}

export default Hoc;
