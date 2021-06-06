import "./App.css";
import Target from "./components/Target";
import MakeDraggable from "./components/MakeDraggable";
// import MakeDraggableHoc from "./components/MakeDraggable/Hoc";

function App() {
  // const DraggableTarget = MakeDraggableHoc(Target);

  return (
    <div className="App">
      {/* <DraggableTarget /> */}
      <MakeDraggable
        style={{ position: "absolute", top: "300px", left: "300px" }}
      >
        <Target />
      </MakeDraggable>
    </div>
  );
}

export default App;
