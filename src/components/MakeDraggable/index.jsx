import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import mouseTracker from "./mouseTracker";

const stopSlowDown = "top 0s, left 0s";

function MakeDraggable({
  onStart,
  onEnd,
  onMove,
  children,
  style = {},
  ...rest
}) {
  const [xOffset, setXoffset] = useState(null);
  const [yOffset, setYoffset] = useState(null);

  const [isDragged, setIsDragged] = useState();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const start = (event) => {
    const box = event.target.getBoundingClientRect();
    setYoffset(mouseTracker.getY() - box.y);
    setXoffset(mouseTracker.getX() - box.x);

    setPos({ x: box.x, y: box.y });

    setIsDragged(true);
  };

  const end = () => {
    setIsDragged(false);
  };

  const divRef = useRef(null);

  const updateCoords = (x, y) => {
    setPos({ x: x - xOffset, y: y - yOffset });
    onMove && onMove(divRef.current, x, y);
  };

  const subIdRef = useRef(null);

  useEffect(() => {
    if (isDragged) {
      subIdRef.current = mouseTracker.subscibe(updateCoords);
      onStart && onStart(divRef.current, pos.x + xOffset, pos.y + yOffset);

      // must specify false so it doesn't trigger on first render
    } else if (isDragged === false) {
      onEnd && onEnd(divRef.current, pos.x + xOffset, pos.y + yOffset);
    }

    return () => {
      subIdRef.current && mouseTracker.unsubscribe(subIdRef.current);
      subIdRef.current = null;
    };
  }, [isDragged]); // eslint-disable-line

  const transitions = style.transition
    ? `${style.transition}, ${stopSlowDown}`
    : stopSlowDown;

  const dragStyles = isDragged
    ? {
        position: "fixed",
        transition: transitions,
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }
    : {};

  const styles = {
    ...style,
    ...dragStyles,
    cursor: "grab",
  };

  return (
    <div
      ref={divRef}
      onMouseDown={start}
      onMouseUp={end}
      style={styles}
      {...rest}
    >
      {children}
    </div>
  );
}

export default MakeDraggable;
