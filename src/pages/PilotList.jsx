import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { getLocalStore } from "../service/StoringDataService";
import { sortingSmallest } from "../service/ProgrammeService";
import style from "./PilotList.module.css";
import { STORING_VIOLATED_DATA } from "../ultilities/Data_Name";
export default function PilotList({ count }) {
  // 1. display list:
  const [listValidatedDrone, setListValidatedDrone] = useState();
  const [showedList, setShowListed] = useState(true);
  // 2. tracking count variable to get data
  useEffect(() => {
    if (count === 5) {
      setListValidatedDrone(getLocalStore(STORING_VIOLATED_DATA));
      console.log("get list");
    }
  }, [count]);
  // 3. render validatedlist function
  const renderValidatedList = () => {
    if (listValidatedDrone === null) {
      return "No validated Drone";
    } else {
      return sortList()?.map((item, index) => {
        const { captureTime, email, firstName, lastName, phoneNumber, distance } = item;
        return (
          <Fragment key={index}>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{moment(captureTime).format("hh:mm:ss")}</td>
              <td>{email}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{phoneNumber}</td>
              <td>{distance.toFixed(1).toLocaleString(0)} m</td>
            </tr>
          </Fragment>
        );
      });
    }
  };
  // 4.sorting including create new arrayobject list
  const sortList = () => {
    let newList = [];
    // 4.1 restructure list from localhost
    listValidatedDrone?.map((item, index) => {
      const { captureTime, violatedPilots } = item;
      violatedPilots.map((item, index) => {
        item = { ...item, captureTime };
        newList.push(item);
      });
    });
    // 4.2. return list with smallest order
    return sortingSmallest(newList, "distance");
  };
  return (
    <div className={style["main"]}>
      <h1>violated pilot list </h1>
      <div>
        <button
          onClick={() => {
            setShowListed(!showedList);
          }}
        >
          Toogle List
        </button>
      </div>
      <div className={style["list"]}>
        {showedList ? (
          <table id="customers">
            <thead>
              <tr>
                <th>Number</th>
                <th>Time</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>{renderValidatedList()}</tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
