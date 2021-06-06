import React, { useState, useEffect, useRef, forwardRef } from "react";
import "./style.css";
import mouseTracker from "./mouseTracker";

function MakeDraggable({ onStart, onEnd, children, style = {}, ...rest }) {
  // TODO: onDragEnd and onDragStart props

  const [xOffset, setXoffset] = useState(null);
  const [yOffset, setYoffset] = useState(null);

  const [isDragged, setIsDragged] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const start = (event) => {
    const box = event.target.getBoundingClientRect();
    setYoffset(mouseTracker.getY() - box.y);
    setXoffset(mouseTracker.getX() - box.x);

    setPos({ x: `${box.x}px`, y: `${box.y}px` });

    setIsDragged(true);
  };

  const end = () => {
    setIsDragged(false);
  };

  const updateCoords = (x, y) => {
    // TODO: prevent from leaving client

    // const correctX = x - xOffset;
    // const correctY = y - yOffset;

    // const limitX = correctX < 0 ? 0 : correctX;

    setPos({ x: `${x - xOffset}px`, y: `${y - yOffset}px` });
  };

  const subIdRef = useRef(null);

  useEffect(() => {
    if (isDragged) {
      subIdRef.current = mouseTracker.subscibe(updateCoords);
      onStart && onStart();
    } else {
      mouseTracker.unsubscribe(subIdRef.current);
      onEnd && onEnd();
    }
  }, [isDragged]); // eslint-disable-line

  useEffect(() => {
    window.addEventListener("mouseup", end);

    return () => {
      mouseTracker.unsubscribe(subIdRef.current);
      window.removeEventListener("mouseup", end);
    };
  }, []);

  return (
    <div
      // onDragStart={(event) => event.preventDefault()}
      className="makeDraggable"
      onMouseDown={start}
      style={{
        ...style,
        cursor: "grab",
        ...(isDragged
          ? {
              position: "fixed",
              /* TODO: replace transition more carefully (regex) */
              transition: "top 0s, left 0s",
              left: pos.x,
              top: pos.y,
            }
          : {}),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default MakeDraggable;

export const WithDraggable = (WrappedComponent) => (props) =>
  (
    <MakeDraggable {...props}>
      <WrappedComponent />
    </MakeDraggable>
  );
