import "./App.css";
import Target from "./components/Target";
import MakeDraggable from "./components/MakeDraggable";

function App() {
  // const logDragStart = (div, curX, curY) =>
  //   console.log("dragging started", div, curX, curY);
  // const logDragEnd = (div, curX, curY) =>
  //   console.log("dragging ended", div, curX, curY);
  // const logDragMove = (div, curX, curY) =>
  //   console.log("moving", div, curX, curY);

  return (
    <div className="App">
      <MakeDraggable
        // onStart={logDragStart}
        // onEnd={logDragEnd}
        // onMove={logDragMove}
        style={{
          position: "absolute",
          top: "300px",
          left: "300px",
          transition: "top 100ms, left 100ms",
        }}
      >
        <Target />
      </MakeDraggable>
    </div>
  );
}

export default App;
