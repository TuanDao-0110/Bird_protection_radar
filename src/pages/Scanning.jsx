import React, { useEffect, useState } from "react";
import rada from "../rada.png";
import { getPilotValidateList } from "../service/CheckingDroneService";
export default function Scanning({ count, setCount }) {
  // const [count, setCount] = useState(0);
  const [scanning, setScanning] = useState(true);
  const [reboot, setReboot] = useState(false);
  // const setUpCountDown = () => {
  //   const interval = setInterval(() => {
  //     setCount((prevCount) => prevCount - 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // };
  // const [count, setCount] = useState(0);
  let interval;

  const updateCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const startProgram = () => {
    console.log("start program");
    interval = setInterval(async () => {
      setReboot(false);
      updateCount();
      await getPilotValidateList(restartProgram);
    }, 1 * 1000);
  };

  const restartProgram = () => {
    setReboot(true);
    console.log("restart");
    // Clear local storage
    localStorage.clear();

    // Reset count
    setCount(0);

    // Clear interval
    clearInterval(interval);

    // Set 2-minute timeout before restarting
    setTimeout(() => {
      // Restart program
      startProgram();
    }, 2 * 60 * 1000);
  };

  useEffect(() => {
    if (scanning) {
      startProgram();

      return () => {
        clearInterval(interval);
      };
    } else {
      clearInterval(interval);
    }
  }, [scanning]);
  if (count === 3) {
    setCount(0);
  }
  return (
    <div>
      <div>
        <p>{count}</p>
        <h3>
          {scanning ? "Scanning ..." : "Stop Scanning ---"} {reboot ? "-- Program is rebooting, back in 1 min" : "Program is running"}
        </h3>
      </div>

      <img src={rada} className={scanning ? "App-logo" : "App-none"} alt="logo" />

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
