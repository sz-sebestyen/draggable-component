import "./App.css";
import Target from "./components/Target";
import MakeDraggable from "./components/MakeDraggable";

function App() {
  return (
    <div className="App">
      <MakeDraggable>
        <Target />
      </MakeDraggable>
    </div>
  );
}

export default App;
