import { TPark } from "./types";

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
