import "./App.css";
import Target from "./components/Target";
import MakeDraggable, { WithDraggable } from "./components/MakeDraggable";

const DraggableTarget = WithDraggable(Target);

function App() {
  const logDragStart = () => console.log("dragging started");
  const logDragEnd = () => console.log("dragging ended");

  return (
    <div className="App">
      <DraggableTarget
        onStart={logDragStart}
        onEnd={logDragEnd}
        style={{
          position: "absolute",
          top: "300px",
          left: "300px",
          transition: "top 100ms, left 100ms",
        }}
      />
      {/*       <MakeDraggable
        style={{
          position: "absolute",
          top: "300px",
          left: "300px",
          transition: "top 100ms, left 100ms",
        }}
      >
        <Target />
      </MakeDraggable> */}
    </div>
  );
}

export default App;
