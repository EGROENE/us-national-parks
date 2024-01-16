import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { getAlertsByParkCode } from "../../api";
import { TPark, TParkAlert } from "../../types";
import { ImageSlideshow } from "../ImageSlideshow/ImageSlideshow";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";
import { DropdownButton } from "../DropdownButton/DropdownButton";
import { ParkActivities } from "../ParkPageItems/ParkActivities/ParkActivities";
import { ParkEntranceFees } from "../ParkPageItems/ParkEntranceFees/ParkEntranceFees";
import { ParkEntrancePasses } from "../ParkPageItems/ParkEntrancePasses/ParkEntrancePasses";
import { ParkContacts } from "../ParkPageItems/ParkContacts/ParkContacts";
import { ParkAlerts } from "../ParkPageItems/ParkAlerts/ParkAlerts";
import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const ParkPage = () => {
  const { parkCode } = useParams();

  // State values dictating if certain park info should be shown (changed by user & hidden by default):
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const [showEntranceFees, setShowEntranceFees] = useState<boolean>(false);
  const [showEntrancePasses, setShowEntrancePasses] = useState<boolean>(false);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);

  document.title = "U.S. National Parks";

  useEffect(() => {
    getAlertsByParkCode(park.parkCode)
      .then((response) => response.text())
      .then((result) => {
        setDidFetchAlerts(true);
        const alertsArray = JSON.parse(result).data;
        setParkAlerts(alertsArray);
      })
      .catch((error) => console.log(error))
      .finally(() => setAlertsAreLoading(false));
  }, [park]);

  const stateIndices: string[] | undefined = park.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(stateFilterOptions).includes(index));
  const parkStates: string[] | undefined = stateIndices.map(
    (index) => stateFilterOptions[index as keyof typeof stateFilterOptions]
  );

  const territoryIndices: string[] | undefined = park?.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(territoryFilterOptions).includes(index));
  const parkTerritories: string[] | undefined = territoryIndices?.map(
    (index) => territoryFilterOptions[index as keyof typeof territoryFilterOptions]
  );

  const areAlerts =
    didFetchAlerts && !alertsAreLoading && parkAlerts && parkAlerts.length > 0;

  return (
    <>
      <NavBar notOnHomepage={true} />
      {isLoading && !successfulFetch && <LoadingMessage />}
      {successfulFetch && !isLoading && (
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
                  <button onClick={() => setShowAlerts(true)}>Show Alerts</button>
                </div>
              </div>
              <div className="park-page-bottom-section">
                {showAlerts && <ParkAlerts parkCode={parkCode} />}
                <DropdownButton
                  text="Activities"
                  action={() =>
                    showActivities ? setShowActivities(false) : setShowActivities(true)
                  }
                  title={showActivities ? "Hide Activities" : "Show Activities"}
                  showItems={showActivities}
                  numberOfItems={park.activities.length}
                />
                <ParkActivities showActivities={showActivities} park={park} />
                <DropdownButton
                  action={() =>
                    showEntranceFees
                      ? setShowEntranceFees(false)
                      : setShowEntranceFees(true)
                  }
                  text="Entrance Fees"
                  title={showEntranceFees ? "Hide Entrance Fees" : "Show Entrance Fees"}
                  showItems={showEntranceFees}
                  numberOfItems={park.entranceFees.length}
                />
                <ParkEntranceFees park={park} showEntranceFees={showEntranceFees} />
                <DropdownButton
                  text="Available Passes"
                  action={() =>
                    showEntrancePasses
                      ? setShowEntrancePasses(false)
                      : setShowEntrancePasses(true)
                  }
                  title={
                    showEntrancePasses ? "Hide Available Passes" : "Show Available Passes"
                  }
                  showItems={showEntrancePasses}
                  numberOfItems={park.entrancePasses.length}
                />
                <ParkEntrancePasses park={park} showEntrancePasses={showEntrancePasses} />
                <DropdownButton
                  text="Contact Info"
                  action={() =>
                    showContactInfo ? setShowContactInfo(false) : setShowContactInfo(true)
                  }
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
      {!isLoading && !successfulFetch && <FailInitFetchMessage />}
    </>
  );
};
