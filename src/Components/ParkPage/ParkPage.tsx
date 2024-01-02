import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { getParkByCode } from "../../api";
import { TPark } from "../../types";
import { ImageSlideshow } from "../ImageSlideshow/ImageSlideshow";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";
import { LoadingMessage } from "../LoadingMessage/LoadingMessage";
import { FailInitFetchMessage } from "../FailInitFetchMessage/FailInitFetchMessage";

export const ParkPage = () => {
  const { parkCode } = useParams();

  const [park, setPark] = useState<TPark>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [successfulFetch, setSuccessfulFetch] = useState<boolean>(false);

  useEffect(() => {
    getParkByCode(parkCode)
      .then((response) => response.text())
      .then((result) => {
        setSuccessfulFetch(true);
        const returnedPark = JSON.parse(result).data[0];
        setPark(returnedPark);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [parkCode]);

  const parkStates = (): string[] | undefined => {
    const stateIndices = park?.states
      .replace(/,/g, " ")
      .split(" ")
      .filter((index) => Object.keys(stateFilterOptions).includes(index));
    return stateIndices?.map((index) => stateFilterOptions[index]);
  };

  const parkTerritories = (): string[] | undefined => {
    const territoryIndices = park?.states
      .replace(/,/g, " ")
      .split(" ")
      .filter((index) => Object.keys(territoryFilterOptions).includes(index));
    return territoryIndices?.map((index) => territoryFilterOptions[index]);
  };

  return (
    <>
      <NavBar notOnHomepage={true} />
      {isLoading && !successfulFetch && <LoadingMessage />}
      {successfulFetch && !isLoading && (
        <>
          <h1>{park?.fullName}</h1>
          <p>Located in {parkStates()?.join(", ") + parkTerritories()?.join(", ")}</p>
          {park && (
            <div className="park-page-main-content-container">
              <div className="park-page-img-slideshow-container">
                <ImageSlideshow park={park} showCaption={true} />
              </div>
              <div className="park-info-container">
                <p>{park.description}</p>
              </div>
            </div>
          )}
        </>
      )}
      {!isLoading && !successfulFetch && <FailInitFetchMessage />}
    </>
  );
};
