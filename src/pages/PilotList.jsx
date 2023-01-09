import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { getLocalStore } from "../service/StoringDataService";
import { sortingSmallest } from "../service/ProgrammeService";
import style from "./PilotList.module.css";
import { RADIUS, STORING_VIOLATED_DATA } from "../ultilities/Data_Name";
import { COUNT_DOWN_TIME } from "../ultilities/Data_Positions";
export default function PilotList({ count }) {
  // 1. display list:
  const [listValidatedDrone, setListValidatedDrone] = useState();
  const [showedList, setShowListed] = useState(true);
  const [displayProgramIntro, setDisplayProgramIntro] = useState(false);

  // 2. tracking count variable to get data
  useEffect(() => {
    if (count === COUNT_DOWN_TIME) {
      setListValidatedDrone(getLocalStore(STORING_VIOLATED_DATA));
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
  // 5. render table function
  const renderTable = () => {
    return (
      <div className={style["list"]}>
        {showedList ? (
          <table>
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
    );
  };
  // 6. render program intro:

  const renderProgramIntro = () => {
    return displayProgramIntro ? (
      <div className={style["list"]}>
        <table>
          <thead>
            <tr>
              <th colSpan={2}> Project intro </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={1} style={{ background: "white" }}>
                Object
              </td>
              <td>
                <p>
                  + Persist the pilot information for
                  <span style={{ color: "red" }}>10 minutes</span>
                  since their drone was last seen by the equipment
                </p>
                <p>
                  + Display the closest confirmed distance to the nest in
                  <span style={{ color: "red" }}>100 meter radius as default setting</span>
                </p>
                <p>+ Contain the pilot name, email address and phone number</p>
                <p>+ Immediately show the information from the last 10 minutes to anyone opening the application</p>
                <p>+ Not require the user to manually refresh the view to see up-to-date information</p>
              </td>
            </tr>
            <tr>
              <td rowSpan={1} style={{ background: "white" }}>
                How Program Operate
              </td>
              <td>
                <p>+ Program auto run when opened</p>
                <p>+ Program auto running mode can turn ON/OFF manually</p>
                <p>+ Program allow expend searching Radius from bird nest</p>
                <p>+ Violated List can manually toogle ON/OFF</p>
              </td>
            </tr>
            <tr>
              <td>Note</td>
              <td>
                <p>+ Program can be shut down due over load / API calling restrict</p>
                <p>+ Program once shut down, it will auto reset and run back again in 2 mins</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      ""
    );
  };
  return (
    <div className={style["main"]}>
      <h1>violated pilot list in {getLocalStore(RADIUS)}meters radius</h1>
      <div>
        <button
          onClick={() => {
            setShowListed(!showedList);
          }}
        >
          Toogle List
        </button>

        <button
          onClick={() => {
            setDisplayProgramIntro(!displayProgramIntro);
          }}
        >
          Program Details
        </button>
      </div>
      {renderTable()}
      {renderProgramIntro()}
    </div>
  );
}
