import moment from "moment";
import React, { useEffect, useState } from "react";
import { getPilotValidateList } from "../service/CheckingDroneService";

export default function PilotList() {
  const [listValidatedDrone, setListValidatedDrone] = useState([]);
  const [showedList, setShowListed] = useState();
  useEffect(() => {}, []);

  return (
    <div>
      <h1>pilot list </h1>
      <button
        onClick={() => {
          console.log(moment("2023-01-06T18:52:47.293Z").format("mm"));

          console.log(moment("2022-05-24T19:46:05.478Z").format("mm"));
        }}
      >
        show list
      </button>
      <button
        onClick={() => {
          getPilotValidateList().then((res) => {
            console.log("pilot list ");
            console.log(res);
          });
        }}
      >
        show Pilot list
      </button>
    </div>
  );
}
