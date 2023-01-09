import { CAPTURE_TIME, RADIUS, STORING_VIOLATED_DATA } from "../ultilities/Data_Name";
import { CIRCLE_RADIUS, TIME_LIMIT } from "../ultilities/Data_Positions";
// 1. get localstore
export const getLocalStore = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
// 2. store data
const storeLocalStore = (data) => {
  localStorage.setItem(STORING_VIOLATED_DATA, JSON.stringify(data));
};
// 3. storing new violated data
export const setUpStore = (newData) => {
  const oldData = getLocalStore(STORING_VIOLATED_DATA);
  let newList;
  // 3.1 if violated data not exist
  if (oldData === null) {
    newList = [];
    newList.push(newData);
    return storeLocalStore(newList);
  } else {
    // 3.2. add new data
    newList = oldData;
    newList.push(newData);
    return storeLocalStore(newList.filter((data) => isTenMinutesApart(data)));
  }
};
// 4. Persist the pilot information for 10 minutes since their drone was last seen by the equipment
const isTenMinutesApart = (oldTime) => {
  const currentTime = new Date();
  const pastTime = new Date(oldTime[CAPTURE_TIME]);
  const differenceInMinutes = (currentTime.getTime() - pastTime.getTime()) / 60000;
  if (differenceInMinutes < TIME_LIMIT) {
    return true;
  } else {
    return false;
  }
};
// 5. set up default radius
export const setUpDefaultRadius = () => {
  localStorage.setItem(RADIUS, CIRCLE_RADIUS);
};
