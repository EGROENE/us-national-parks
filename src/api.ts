import { key } from "./strengGeheim";

const baseURL = `https://developer.nps.gov/api/v1`;

// use this to set allNationalParks in App, then make derived var displayedParks that filters items in allNationalParks whose designation field includes "National Park"
export const getParks = (): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", key);

  return fetch(`${baseURL}/parks?limit=471`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
};

// THIS LOGGED JSON RESPONSE OBJ IN TS PLAYGROUND:
// import key from ignored file so it's not visible on GitHub
/* const key = "D17g1YAioXceZYKvvUJwnydlv7pMbyn78AWCkEfm";

const baseURL = `developer.nps.gov/api/v1`;

// use this to set allNationalParks in App, then make derived var displayedParks that filters items in allNationalParks whose designation field includes "National Park"
const getParks = (limit: number) => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "D17g1YAioXceZYKvvUJwnydlv7pMbyn78AWCkEfm");

  return fetch(`https://developer.nps.gov/api/v1/parks?limit=${limit}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  })
  .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
getParks(2) */
