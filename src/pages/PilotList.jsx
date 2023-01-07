import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { getPilotValidateList } from "../service/CheckingDroneService";
import { getLocalStore } from "../service/DataService";
import { sortingSmallest } from "../service/ProgrammeService";
import style from "./PilotList.module.css";
export default function PilotList({ count }) {
  const [listValidatedDrone, setListValidatedDrone] = useState([]);
  const [showedList, setShowListed] = useState(true);
  useEffect(() => {
    if (count === 0) {
      setListValidatedDrone(getLocalStore());
    }
  }, [count]);

  const renderValidatedList = () => {
    if (listValidatedDrone === null) {
      return "No validated Drone";
    } else {
      return sortList()?.map((item, index) => {
        const { captureTime, email, firstName, lastName, phoneNumber, distance } = item;
        return (
          <Fragment key={index}>
            <tr key={index}>
              <td>{captureTime}</td>
              <td>{email}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{phoneNumber}</td>
              <td>{distance.toLocaleString(0)} m</td>
            </tr>
          </Fragment>
        );
      });
    }
  };
  const sortList = () => {
    let newList = [];
    // 1 restructure list from localhost
    listValidatedDrone?.map((item, index) => {
      const { captureTime, pilots } = item;
      pilots.map((item, index) => {
        item = { ...item, captureTime };
        newList.push(item);
      });
    });
    return sortingSmallest(newList, "distance");
  };
  return (
    <div className={style["main"]}>
      <h1>pilot list </h1>
      <div>
        <button
          onClick={() => {
            setShowListed(!showedList);
          }}
        >
          show list
        </button>
        <button
          onClick={() => {
            getPilotValidateList();
          }}
        >
          show Pilot list
        </button>
      </div>
      <div className={style["list"]}>
        {showedList ? (
          <table id="customers">
            <thead>
              <tr>
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
