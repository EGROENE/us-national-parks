import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { getParkByCode } from "../../api";
import { TPark } from "../../types";
import { ImageSlideshow } from "../ImageSlideshow/ImageSlideshow";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";
import { DropdownButton } from "../DropdownButton/DropdownButton";
import { ParkActivities } from "../ParkPageItems/ParkActivities/ParkActivities";
import { ParkEntranceFees } from "../ParkPageItems/ParkEntranceFees/ParkEntranceFees";
import { ParkEntrancePasses } from "../ParkPageItems/ParkEntrancePasses/ParkEntrancePasses";
import { ParkContacts } from "../ParkPageItems/ParkContacts/ParkContacts";
import { ParkAlerts } from "../ParkPageItems/ParkAlerts/ParkAlerts";
import { LoadingMessage } from "../LoadingMessage/LoadingMessage";
import { FailInitFetchMessage } from "../FailInitFetchMessage/FailInitFetchMessage";
import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const ParkPage = () => {
  // Values relating to park alerts:
  const { allNPAlerts } = useMainContentContext();
  const { parkCode } = useParams();
  const [park, setPark] = useState<TPark>();
  const [parkIsLoading, setParkIsLoading] = useState<boolean>(true);
  const [didFetchPark, setDidFetchPark] = useState<boolean>(false);

  // State values dictating if certain park info should be shown (changed by user & hidden by default):
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const [showEntranceFees, setShowEntranceFees] = useState<boolean>(false);
  const [showEntrancePasses, setShowEntrancePasses] = useState<boolean>(false);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);

  document.title = "U.S. National Parks";

  useEffect(() => {
    getParkByCode(parkCode)
      .then((response) => response.text())
      .then((result) => {
        setDidFetchPark(true);
        setPark(JSON.parse(result).data[0]);
      })
      .catch((error) => console.log(error))
      .finally(() => setParkIsLoading(false));
  }, [setParkIsLoading, parkCode, setPark]);

  const stateIndices: string[] | undefined = park?.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(stateFilterOptions).includes(index));
  const parkStates: string[] | undefined = stateIndices?.map(
    (index) => stateFilterOptions[index as keyof typeof stateFilterOptions]
  );

  const territoryIndices: string[] | undefined = park?.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(territoryFilterOptions).includes(index));
  const parkTerritories: string[] | undefined = territoryIndices?.map(
    (index) => territoryFilterOptions[index as keyof typeof territoryFilterOptions]
  );

  const parkAlerts = allNPAlerts.filter((alert) => {
    return alert.parkCode === parkCode;
  });
  const areAlerts = parkAlerts.length > 0;

  return (
    <>
      <NavBar notOnHomepage={true} />
      {parkIsLoading && !didFetchPark && <LoadingMessage />}
      {didFetchPark && !parkIsLoading && (
        <>
          <h1>{park?.fullName}</h1>
          {/* Add 'and' before last item in list of states/territories */}
          <p>
            Located in{" "}
            {parkStates !== undefined &&
              parkTerritories !== undefined &&
              parkStates.join(", ") + parkTerritories.join(", ")}
          </p>
          <p className="longitude-latitude">
            Longitude: {`${park?.longitude}`} | Latitude: {`${park?.latitude}`}
          </p>
          <a
            className="park-google-maps-link"
            target="_blank"
            href={`https://www.google.com/maps/search/?api=1&query=${park?.fullName
              .toLowerCase()
              .replace(/\s/g, "+")}`}
          >
            See on Google Maps
          </a>
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
                  {areAlerts ? (
                    <button onClick={() => setShowAlerts(true)}>Show Alerts</button>
                  ) : (
                    <p>No current alerts for this park.</p>
                  )}
                </div>
              </div>
              <div className="park-page-bottom-section">
                {showAlerts && <ParkAlerts parkCode={parkCode} />}
                <DropdownButton
                  text="Activities"
                  action={() => setShowActivities(!showActivities)}
                  title={showActivities ? "Hide Activities" : "Show Activities"}
                  showItems={showActivities}
                  numberOfItems={park.activities.length}
                />
                <ParkActivities showActivities={showActivities} park={park} />
                <DropdownButton
                  action={() => setShowEntranceFees(!showEntranceFees)}
                  text="Entrance Fees"
                  title={showEntranceFees ? "Hide Entrance Fees" : "Show Entrance Fees"}
                  showItems={showEntranceFees}
                  numberOfItems={park.entranceFees.length}
                />
                <ParkEntranceFees park={park} showEntranceFees={showEntranceFees} />
                <DropdownButton
                  text="Available Passes"
                  action={() => setShowEntrancePasses(!showEntrancePasses)}
                  title={
                    showEntrancePasses ? "Hide Available Passes" : "Show Available Passes"
                  }
                  showItems={showEntrancePasses}
                  numberOfItems={park.entrancePasses.length}
                />
                <ParkEntrancePasses park={park} showEntrancePasses={showEntrancePasses} />
                <DropdownButton
                  text="Contact Info"
                  action={() => setShowContactInfo(!showContactInfo)}
                  title={showContactInfo ? "Hide Contact Info" : "Hide Contact Info"}
                  showItems={showContactInfo}
                  numberOfItems={Object.keys(park.contacts).length}
                />
                <ParkContacts park={park} showContactInfo={showContactInfo} />
              </div>
            </div>
          )}
        </>
      )}
      {!parkIsLoading && !didFetchPark && <FailInitFetchMessage />}
    </>
  );
};
