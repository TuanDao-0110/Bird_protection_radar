import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { getPilotValidateList } from "../service/CheckingDroneService";
import { getLocalStore } from "../service/DataService";
import style from "./PilotList.module.css";
export default function PilotList() {
  const [listValidatedDrone, setListValidatedDrone] = useState([]);
  const [showedList, setShowListed] = useState(true);
  useEffect(() => {
    setListValidatedDrone(getLocalStore());
  }, []);

  const renderValidatedList = () => {
    if (listValidatedDrone === null) {
      return "No validated Drone";
    } else {
      return listValidatedDrone?.map((item, index) => {
        const { captureTime, pilots } = item;
        return (
          <Fragment key={index}>
            <tr>
              <td rowSpan={pilots.length}>{moment(captureTime).format("dd hh:mm:ss")}</td>
              {pilots.map((item, index) => {
                const { email, firstName, lastName, phoneNumber, distance } = item;
                return index === 0 ? (
                  <Fragment key={index}>
                    <td>{email}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{phoneNumber}</td>
                    <td>{distance.toLocaleString(0)} m</td>
                  </Fragment>
                ) : (
                  ""
                );
              })}
            </tr>
            {pilots.map((item, index) => {
              const { email, firstName, lastName, phoneNumber, distance } = item;
              return index !== 0 ? (
                <tr key={index}>
                  <td>{email}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{phoneNumber}</td>
                  <td>{distance.toLocaleString(0)} m</td>
                </tr>
              ) : (
                ""
              );
            })}
          </Fragment>
        );
      });
    }
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
