import React, { useEffect, useState } from "react";
import rada from "../rada.png";
import { getPilotViolatedDronesList } from "../service/CheckingDroneService";
import { setUpDefaultRadius } from "../service/StoringDataService";
import { COUNT_DOWN_TIME } from "../ultilities/Data_Positions";
export default function Scanning({ count, setCount }) {
  const [scanning, setScanning] = useState(true);
  const [reboot, setReboot] = useState(false);
  let interval;
  // 1. count down every 1s
  const updateCount = () => {
    setCount((prevCount) => prevCount - 1);
  };
  // 2. set interval program check until count = 0 call drone API
  const startProgram = () => {
    interval = setInterval(async () => {
      setReboot(false);
      updateCount();
      if (count === 0) {
        console.log("start");
        await getPilotViolatedDronesList(restartProgram);
      }
    }, 1000);
  };
  // 3. set up restart again program in case call api Error,
  const restartProgram = () => {
    // 3.1 stop scannin vs start reboot
    setScanning(false);
    setReboot(true);
    //3.2 Clear local storage
    localStorage.clear();

    //3.3 Reset count
    setCount(COUNT_DOWN_TIME);

    //3.4 Clear interval ==> make sure all interval stop
    clearInterval(interval);

    //3.5 Set 2-minute time and start program again
    setTimeout(() => {
      console.log("reset");
      window.location.reload();
      setScanning(true);
      // Restart program
      startProgram();
    }, 2 * 30 * 1000);
  };
  // 4. System keep running when every count run
  useEffect(() => {
    // 4.1 scanning true --> allow startProgram clear interval to prevent infinite call
    if (scanning) {
      startProgram();
      return () => {
        clearInterval(interval);
      };
    } else {
      clearInterval(interval);
    }
  }, [scanning, count]);
  if (count === -1) {
    setCount(COUNT_DOWN_TIME);
  }

  return (
    <div>
      <div>
        <p>Take snapshot in: {count}s</p>

        <h3>{scanning ? "System Scanning ..." : "System Stop Scanning"}</h3>
        <h3>{reboot ? "System is suspended -- Program is rebooting, back scanning in 2 mins" : "Program is running"}</h3>
      </div>
      <img src={rada} className={scanning ? "App-logo" : "App-none"} alt="logo" />

      <div>
        <button
          onClick={() => {
            setScanning(!scanning);
          }}
        >
          Manual Toogle Auto Scan
        </button>
        <button
          onClick={() => {
            setScanning(false);
          }}
        >
          Pause Auto Scan
        </button>
      </div>
    </div>
  );
}
