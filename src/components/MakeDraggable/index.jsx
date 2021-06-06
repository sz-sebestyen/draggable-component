import React, { useState, useEffect, useRef } from "react";
import "./style.css";

function MakeDraggable({ children }) {
  const [isDragged, setIsDragged] = useState(false);

  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [xOffset, setXoffset] = useState(null);
  const [yOffset, setYoffset] = useState(null);

  const [restX, setRestX] = useState(0);
  const [restY, setRestY] = useState(0);

  const start = (event) => {
    const box = event.target.getBoundingClientRect();
    setYoffset(y - box.y);
    setXoffset(x - box.x);
    setIsDragged(true);
  };

  const mainRef = useRef(null);

  const end = () => {
    const box = mainRef.current.getBoundingClientRect();
    setRestX(box.x);
    setRestY(box.y);
    setIsDragged(false);
  };

  const updateCoords = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateCoords);
    window.addEventListener("mouseup", end);
    return () => {
      window.removeEventListener("mousemove", updateCoords);
      window.removeEventListener("mouseup", end);
    };
  }, []);

  return (
    <div
      ref={mainRef}
      onDragStart={(event) => event.preventDefault()}
      className="makeDraggable"
      onMouseDown={start}
      style={
        isDragged
          ? {
              position: "fixed",
              top: `${y - yOffset}px`,
              left: `${x - xOffset}px`,
            }
          : { position: "fixed", top: `${restY}`, left: `${restX}` }
      }
    >
      {children}
    </div>
  );
}

export default MakeDraggable;
