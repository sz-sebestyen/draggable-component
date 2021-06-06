import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import mouseTracker from "./mouseTracker";

function MakeDraggable({ children, style = {} }) {
  const [xOffset, setXoffset] = useState(null);
  const [yOffset, setYoffset] = useState(null);

  const [isDragged, setIsDragged] = useState(false);

  const subIdRef = useRef(null);

  const start = (event) => {
    const box = event.target.getBoundingClientRect();
    setYoffset(mouseTracker.getY() - box.y);
    setXoffset(mouseTracker.getX() - box.x);
    setIsDragged(true);
  };

  useEffect(() => {
    if (isDragged) {
      subIdRef.current = mouseTracker.subscibe(updateCoords);
    } else {
      mouseTracker.unsubscribe(subIdRef.current);
    }
  }, [isDragged]); // eslint-disable-line

  const mainRef = useRef(null);

  const end = () => {
    setIsDragged(false);
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

  return (
    <div
      ref={mainRef}
      onDragStart={(event) => event.preventDefault()}
      className="makeDraggable"
      onMouseDown={start}
      style={{
        ...style,
        position: "fixed",
        cursor: "grab",
        ...(isDragged ? { transition: "top 0s, left 0s" } : {}),
      }}
    >
      {children}
    </div>
  );
}

export default MakeDraggable;
