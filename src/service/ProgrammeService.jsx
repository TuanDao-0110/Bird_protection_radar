// 1. using bubble sort to get smallest value

import { RADIUS } from "../ultilities/Data_Name";

export const sortingSmallest = (array, key) => {
  // using bubble sort
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i][key] > array[i + 1][key]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return array;
};
// 2. add  radius value in local storage
export const add100MRadius = () => {
  const oldRadius = Number(localStorage.getItem(RADIUS));
  localStorage.setItem(RADIUS, oldRadius + 1000);
};
// 3. remove radius value in local storage
export const remove100MRadius = () => {
  const oldRadius = Number(localStorage.getItem(RADIUS));
  if (oldRadius > 100) {
    localStorage.setItem(RADIUS, oldRadius - 1000);
  }
};
