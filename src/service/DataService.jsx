import { TIME_LIMIT } from "../ultilities/Api";

export const getLocalStore = () => {
  return JSON.parse(localStorage.getItem("data"));
};

const storeLocalStore = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const setUpStore = (newData) => {
  const oldData = getLocalStore();
  let newList;
  if (oldData === null) {
    newList = [];
    newList.push(newData);
    return storeLocalStore(newList);
  } else {
    // 2. add new data
    newList = [...oldData];
    newList.push(newData);
    if (isTenMinutesApart(newList)) {
      return storeLocalStore(newList.pop());
    } else {
      return storeLocalStore(newList);
    }
  }
};

const isTenMinutesApart = (newList) => {
  const time1 = new Date(newList[0]["captureTime"]);
  const time2 = new Date(newList[newList.length - 1]["captureTime"]);
  const difference = Math.abs(time1 - time2);

  // Convert the difference to minutes
  const minutes = difference / 1000 / 60;
  // Return true if the difference is more than 10 minutes
  return minutes > TIME_LIMIT;
};
