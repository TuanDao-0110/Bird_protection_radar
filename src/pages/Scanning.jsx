import React, { useEffect, useState } from "react";
import rada from "../rada.png";
import { getPilotValidateList } from "../service/CheckingDroneService";
export default function Scanning() {
  const [count, setCount] = useState(2);
  const [scanning, setScanning] = useState(true);
  const setUpCountDown = () => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (scanning) {
      // return setUpCountDown();
    } else {
      return;
    }
  }, [scanning]);

  if (count === -1) {
    // Run function after 2 seconds
    getPilotValidateList();
    setCount(2);
  }

  return (
    <div>
      <p>{count}</p>
      <img src={rada} className="App-logo" alt="logo" />
      <div>
        <button 
          onClick={() => {
            setScanning(true);
          }}
        >
          auto scan start{" "}
        </button>
        <button
          onClick={() => {
            setScanning(false);
          }}
        >
          stop auto scan
        </button>
      </div>
    </div>
  );
}
