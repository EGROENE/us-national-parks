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

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return undefined;
};
