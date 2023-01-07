import axios from "axios";
import { CORS_PROXY_URL, GET_PILOT, GET_THRONE } from "../ultilities/Api";

// 1. call api to get drone location
export const getThrone = async (restartProgram) => {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: CORS_PROXY_URL + GET_THRONE,
    });
    console.log(data);
    if (status === 200) {
      let droneData = parseXml(data);
      return droneData;
    }
  } catch (error) {
    // restartProgram();
    console.log(error);
    return error;
  }
};
// 1.1 parse XML data return Array
const parseXml = (xml) => {
  let data = {};
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  data.captureTime = doc.querySelector("capture").getAttribute("snapshotTimestamp");

  const drones = doc.querySelectorAll("drone");
  const arrDrone = [];
  drones.forEach((drone) => {
    arrDrone.push(createObject(drone));
  });
  data.arrDrone = arrDrone;
  return data;
};
// 1.2 create each drone object data
const createObject = (drone) => {
  let newObject = Object.assign(
    {},
    {
      serialNumber: drone.getElementsByTagName("serialNumber")[0].textContent,
      firmware: drone.getElementsByTagName("firmware")[0].textContent,
      positionY: drone.getElementsByTagName("positionY")[0].textContent,
      positionX: drone.getElementsByTagName("positionX")[0].textContent,
    }
  );
  return newObject;
};
// 2. call api to get pilot api
export const getPilot = async (serialNumber) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: CORS_PROXY_URL + GET_PILOT + serialNumber,
    });
    return data;
  } catch (error) {
    return error;
  }
};
