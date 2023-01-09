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
    console.log(newList);
    return storeLocalStore(newList);
  } else {
    // 3.2. add new data
    newList = oldData;
    newList.push(newData);
    if (isTenMinutesApart(newList)) {
      return storeLocalStore(newList.pop());
    } else {
      return storeLocalStore(newList);
    }
  }
};
// 4. Persist the pilot information for 10 minutes since their drone was last seen by the equipment
const isTenMinutesApart = (newList) => {
  const time1 = new Date(newList[0][CAPTURE_TIME]);
  const time2 = new Date(newList[newList.length - 1][CAPTURE_TIME]);
  const difference = Math.abs(time1 - time2);

  // Convert the difference to minutes
  const minutes = difference / 1000 / 60;
  // Return true if the difference is more than 10 minutes
  return minutes > TIME_LIMIT;
};
// 5. set up default radius
export const setUpDefaultRadius = () => {
  localStorage.setItem(RADIUS, CIRCLE_RADIUS);
};
