import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { getParks } from "../../api";
import { TPark } from "../../types";
import { getParksSortedAlphabeticallyByFullName } from "../../methods";

export const ParkPage = () => {
  const { parkCode } = useParams();

  /* Must have its own state & useEffect to set state values in case user lands on this page first, not on homepage. If this happens, allNationalParks state value from mainContentContext wouldn't yet be set, resulting in an error */
  const [allNationalParks, setAllNationalParks] = useState<TPark[]>();
  const [park, setPark] = useState<TPark>();
  // Maybe add isLoading state to work w/ <Loading Message /> & <FailInitFetchMessage />

  useEffect(() => {
    getParks()
      .then((response) => response.text())
      .then((result) => {
        const parksJSArray: TPark[] = JSON.parse(result).data;
        const nationalParksArray: TPark[] = getParksSortedAlphabeticallyByFullName(
          parksJSArray
            .filter((park) => park.designation.includes("National Park"))
            .concat(
              parksJSArray.filter((park) =>
                park.designation.includes("National and State Parks")
              )
            )
        );
        setAllNationalParks(nationalParksArray);
        setPark(allNationalParks?.filter((park) => park.parkCode === parkCode)[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allNationalParks, parkCode]);

  return (
    <>
      <NavBar notOnHomepage={true} />
      <h1>{park?.fullName}</h1>
      <img src={park?.images[0].url} alt={park?.images[0].altText} />
    </>
  );
};
