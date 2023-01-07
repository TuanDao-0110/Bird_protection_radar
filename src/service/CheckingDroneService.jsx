import { BIRD_NEST, CIRCLE_RADIUS, SNAPSHOT } from "../ultilities/Data_Positions";
import { getPilot, getThrone } from "./ApiService";
import { setUpStore } from "./DataService";
// 1. check drone by using its position to check wheather it violated or not
export const checkDroneViolation = (drone) => {
  if (calculateDistance(drone) <= CIRCLE_RADIUS) {
    return true;
  } else {
    return false;
  }
};

// Example usage
// const drones = [
//   { positionX: 249999, positionY: 249999 },
//   { positionX: 250001, positionY: 250001 },
//   { positionX: 0, positionY: 250002 },
// ];

export const checkDroneInSnapShotArea = (drone) => {
  const { positionY: birdY, positionX: birdX } = BIRD_NEST;
  const { positionY: droneY, positionX: droneX } = drone;
  // check drone position belong to 500m^2 fron bird nest
  if (birdX - SNAPSHOT <= droneX <= birdX + SNAPSHOT && birdY - SNAPSHOT <= droneY <= birdY + SNAPSHOT) {
    return true;
  }
  return false;
};

export const calculateDistance = (drone) => {
  const { positionX: birdX, positionY: birdY } = BIRD_NEST;
  const distance = Math.sqrt(Math.pow(drone.positionX - birdX, 2) + Math.pow(drone.positionY - birdY, 2));
  return distance;
};

export const persistData = () => {};
// 2. get pilot data
export const getPilotValidateList = async (restartProgram) => {
  try {
    const droneData = await getThrone(restartProgram);
    if (droneData) {
      const { captureTime, arrDrone } = droneData;
      let pilots = [];
      let validationDrones = [];
      let validationData = {};
      arrDrone?.map((drone) => {
        // eslint-disable-next-line no-unused-expressions
        !checkDroneViolation(drone) ? validationDrones.push(drone) : " ";
      });
      if (validationDrones.length !== 0) {
        for (let i = 0; i < validationDrones.length - 1; i++) {
          let pilot = await getPilot(validationDrones[i].serialNumber).then((pilot) => {
            const { email, firstName, lastName, phoneNumber } = pilot;
            const distance = calculateDistance(validationDrones[i]);
            const validatedPilotData = { email, firstName, lastName, phoneNumber, distance };
            return validatedPilotData;
          });
          pilots.push(pilot);
        }
        Object.assign(validationData, {
          captureTime,
          pilots,
        });
        setUpStore(validationData);
        return validationData;
      }
    }
  } catch (error) {
    return error;
  }
};
