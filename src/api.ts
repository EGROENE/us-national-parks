import { npsKey } from "./strengGeheim";
const npsBaseURL = `https://developer.nps.gov/api/v1`;

// http://api.weatherapi.com/v1/current.json?key=e8bca6fdc7034fd3ac853950241901&q=47.80392754,
import { weatherAPIKey } from "./strengGeheim";
const weatherBaseURL = "http://api.weatherapi.com/v1/current.json?";

export const getParks = (): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", npsKey);

  return fetch(`${npsBaseURL}/parks?limit=471`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
};

export const getParkByCode = (code: string | undefined): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", npsKey);

  return fetch(`${npsBaseURL}/parks?parkCode=${code}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
};

export const getAllNPAlerts = (): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");
  myHeaders.append("X-Api-Key", npsKey);

  return fetch(`${npsBaseURL}/alerts`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
};

export const getParkCurrentWeather = (
  latitude: string,
  longitude: string
): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Try hiding key from URL eventually, though may not matter b/c at least 1M requests are allowed per month under free plan
  return fetch(`${weatherBaseURL}key=${weatherAPIKey}&q=${latitude},${longitude}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
};
