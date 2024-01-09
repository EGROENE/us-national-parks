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
  const [showActivities, setShowActivities] = useState<boolean>(false);

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

  const stateIndices: string[] | undefined = park?.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(stateFilterOptions).includes(index));
  const parkStates: string[] | undefined = stateIndices?.map(
    (index) => stateFilterOptions[index]
  );

  const territoryIndices: string[] | undefined = park?.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(territoryFilterOptions).includes(index));
  const parkTerritories: string[] | undefined = territoryIndices?.map(
    (index) => territoryFilterOptions[index]
  );

  return (
    <>
      <NavBar notOnHomepage={true} />
      {isLoading && !successfulFetch && <LoadingMessage />}
      {successfulFetch && !isLoading && (
        <>
          <h1>{park?.fullName}</h1>
          {/* Add 'and' before last item in list of states/territories */}
          <p>Located in {parkStates?.join(", ") + parkTerritories?.join(", ")}</p>
          <p className="longitude-latitude">
            Longitude: {`${park?.longitude}`} | Latitude: {`${park?.latitude}`}
          </p>
          {park && (
            <div className="park-page-main-content-container">
              <div className="park-page-top-section">
                <div className="park-page-img-slideshow-container">
                  <ImageSlideshow park={park} showCaption={true} />
                </div>
                <div className="park-basic-info-container">
                  <header>Description</header>
                  <p>{park.description}</p>
                  <header>General Weather Info</header>
                  <p>{park.weatherInfo}</p>
                </div>
              </div>
              <div className="park-page-bottom-section">
                <button
                  onClick={() =>
                    showActivities ? setShowActivities(false) : setShowActivities(true)
                  }
                  title={showActivities ? "Hide Activities" : "Show Activities"}
                >
                  <p>Activities</p>
                  <i
                    style={{ rotate: showActivities ? "0deg" : "90deg" }}
                    className="fas fa-angle-right"
                  ></i>
                </button>
                {showActivities && (
                  <div className="park-activities-container">
                    {park.activities.map((activity) => (
                      <p className="park-activity">{activity.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {!isLoading && !successfulFetch && <FailInitFetchMessage />}
    </>
  );
};
