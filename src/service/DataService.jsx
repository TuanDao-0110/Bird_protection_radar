import moment from "moment/moment";
export const getLocalStore = () => {
  return JSON.parse(localStorage.getItem("data"));
};

const storeLocalStore = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const setUpStore = (newData) => {
  const oldData = getLocalStore();
  let newList;
  if (oldData !== null) {
    // 1. add new data
    newList = [...oldData];
    newList.push(newData);
    if (showMinute(newList[0].captureTime - newList[newList.length].captureTime) < 10) {
      return storeLocalStore(newList);
    } else {
      return storeLocalStore(newList.pop());
    }
  } else {
    newList = [];
    newList.push(newData);
    return storeLocalStore(newList);
  }
  //   2. Persist the pilot information for 10 minutes
};

const showMinute = (time) => {
  return moment(time).format("mm");
};
