import { RADIUS } from "../ultilities/Data_Name";
import { BIRD_NEST } from "../ultilities/Data_Positions";
import { getPilot, getThrone } from "./ApiService";
import { setUpStore } from "./StoringDataService";
// 1. check drone by using its position to check wheather it violated or not
const checkDroneViolation = (drone) => {
  if (calculateDistance(drone) <= Number(localStorage.getItem(RADIUS))) {
    return true;
  } else {
    return false;
  }
};

// 2. calculate distance between drone vs bird nest location
const calculateDistance = (drone) => {
  const { positionX: birdX, positionY: birdY } = BIRD_NEST;
  const distance = Math.sqrt(Math.pow(drone.positionX - birdX, 2) + Math.pow(drone.positionY - birdY, 2));
  return distance;
};
// 3. storing violated pilot data
const storeViolatedData = async (droneData) => {
  // 3.1 create violated drone array
  const { captureTime, arrDrone } = droneData;
  let violatedPilots = [];
  let violatedDrones = [];
  let violatedData = {};
  for (let i = 0; i < arrDrone.length - 1; i++) {
    if (checkDroneViolation(arrDrone[i])) {
      violatedDrones.push(arrDrone[i]);
    }
  }
  // 3.2 check if violated array exists or not
  if (violatedDrones.length > 0) {
    // 3.2.1 get all pilot and create storing data
    let violatedPilotsPromise = violatedDrones.map(async (drone, item) => {
      await getPilot(drone.serialNumber).then((pilot) => {
        const { email, firstName, lastName, phoneNumber } = pilot;
        const distance = calculateDistance(drone);
        const violatedPilot = { email, firstName, lastName, phoneNumber, distance };
        violatedPilots.push(violatedPilot);
      });
    });
    // 3.2.2 because all many API request from call pilot data make sure it will wait until all pilot called success
    await Promise.all(violatedPilotsPromise);
    // 3.2.3 success create violated data with time capture vs violated pilot array
    Object.assign(violatedData, {
      captureTime,
      violatedPilots,
    });
    // 3.2.4 set up to local store
    setUpStore(violatedData);
  }
};
// 4. get pilot data vs return as Object Format:
export const getPilotViolatedDronesList = async (restartProgram) => {
  try {
    const droneData = await getThrone(restartProgram);
    if (droneData) {
      await storeViolatedData(droneData);
    }
  } catch (error) {
    return error;
  }
};
