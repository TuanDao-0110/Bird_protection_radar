import { useEffect, useState } from "react";
import "./App.css";
import PilotList from "./pages/PilotList";
import Scanning from "./pages/Scanning";
import { setUpDefaultRadius } from "./service/StoringDataService";
import { add100MRadius, remove100MRadius } from "./service/ProgrammeService";
import { COUNT_DOWN_TIME } from "./ultilities/Data_Positions";

function App() {
  const [count, setCount] = useState(COUNT_DOWN_TIME);
   useEffect(() => {
     setUpDefaultRadius();
   }, []);
  return (
    <div className="App">
      <h1>Auto scanning drone rada system</h1>
      <div className="App_Edit">
        <div className="App_Radius_Edit">
          <h2>change searching radius</h2>
          <button onClick={add100MRadius}>+1000 m</button>
          <p>{localStorage.getItem("radius")} m</p>
          <button onClick={remove100MRadius}>-1000 m</button>
        </div>
      </div>
      <Scanning count={count} setCount={setCount} />
      <PilotList count={count} />
    </div>
  );
}

export default App;
