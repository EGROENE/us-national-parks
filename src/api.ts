import { key } from "./strengGeheim";

const baseURL = `https://developer.nps.gov/api/v1`;

export const getParks = (): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", key);

  return fetch(`${baseURL}/parks?limit=471`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
};

export const getParkByCode = (code: string | undefined): Promise<Response> => {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", key);

  return fetch(`${baseURL}/parks?parkCode=${code}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
};
