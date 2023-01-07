import { useState } from "react";
import "./App.css";
import PilotList from "./pages/PilotList";
import Scanning from "./pages/Scanning";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
    
      <Scanning count={count} setCount={setCount} />
      <PilotList count={count} />
    </div>
  );
}

export default App;
