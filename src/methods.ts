import { TPark } from "./types";
type TParkActivities = [
  {
    id: string;
    name: string;
  }
];

/* export const getObjectArraySortedAlphabeticallyByProperty = (
  array: TParkActivities | TPark[],
  property
) => {
  return array.sort(function (a, b) {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  });
}; */

export const getParksSortedAlphabeticallyByFullName = (array: Array<TPark>) => {
  return array.sort(function (a, b) {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  });
};

export const getParkActivitiesSortedAlphabeticallyByName = (array: TParkActivities) => {
  return array.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};
