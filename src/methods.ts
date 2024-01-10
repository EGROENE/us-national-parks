import { TPark } from "./types";

type TParkActivities = [
  {
    id: string;
    name: string;
  }
];

export const getObjectArraySortedAlphabeticallyByProperty = (
  array: TParkActivities | TPark[],
  property: string
) => {
  return array.sort(function (a, b) {
    if (a[property as keyof typeof a] < b[property as keyof typeof b]) {
      return -1;
    }
    if (a[property as keyof typeof a] > b[property as keyof typeof b]) {
      return 1;
    }
    return 0;
  });
};
