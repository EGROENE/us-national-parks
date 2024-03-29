import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Method(s):
import { getParkByCode, getParkCurrentWeather } from "../../../api";
import { formatTitleCapitalization } from "../../../methods";

// Type(s):
import { TParkAlert, TCurrentWeather, TPark } from "../../../types";

// Constants:
import { stateFilterOptions, territoryFilterOptions } from "../../../constants";

// Components:
import NavBar from "../../VersatileComponents/NavBar/NavBar";
import ImageSlideshow from "../../VersatileComponents/ImageSlideshow/ImageSlideshow";
import DropdownButton from "../../VersatileComponents/DropdownButton/DropdownButton";
import ParkActivities from "../ParkPageItems/ParkActivities/ParkActivities";
import ParkEntranceFees from "../ParkPageItems/ParkEntranceFees/ParkEntranceFees";
import ParkEntrancePasses from "../ParkPageItems/ParkEntrancePasses/ParkEntrancePasses";
import ParkContacts from "../ParkPageItems/ParkContacts/ParkContacts";
import ParkAlerts from "../ParkPageItems/ParkAlerts/ParkAlerts";
import ParkCurrentWeather from "../ParkPageItems/ParkCurrentWeather/ParkCurrentWeather";
import UniversalFooter from "../../VersatileComponents/UniversalFooter/UniversalFooter";
import FailFetchMessage from "../../VersatileComponents/FailFetchMessage/FailFetchMessage";
import LoadingMessage from "../../VersatileComponents/LoadingMessage/LoadingMessage";

// Hook(s):
import { useMainContentContext } from "../../../Hooks/useMainContentContext";
import ParkCard from "../../VersatileComponents/ParkCard/ParkCard";

const ParkPage = () => {
  // Values relating to park info (alerts, current weather, etc.):
  const { allNPAlerts, allNationalParks } = useMainContentContext();
  const { parkCode } = useParams();
  const parkAlerts: TParkAlert[] = allNPAlerts.filter(
    (alert) => alert.parkCode === parkCode
  );
  const areAlerts: boolean = parkAlerts.length > 0;
  const [park, setPark] = useState<TPark | undefined>();
  const [wasError429, setWasError429] = useState<boolean>(false);
  const [parkIsLoading, setParkIsLoading] = useState<boolean>(true);
  const [parkWeather, setParkWeather] = useState<TCurrentWeather | undefined>();
  const [wasErrorFetchingWeather, setWasErrorFetchingWeather] = useState<boolean>(false);

  // State values dictating if certain park info should be shown (changed by user & hidden by default):
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const [showEntranceFees, setShowEntranceFees] = useState<boolean>(false);
  const [showEntrancePasses, setShowEntrancePasses] = useState<boolean>(false);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);
  const [showCurrentWeather, setShowCurrentWeather] = useState<boolean>(false);
  const [showNearbyParks, setShowNearbyParks] = useState<boolean>(false);

  document.title = park ? `${park.fullName}` : "U.S. National Parks";

  useEffect(() => {
    if (allNationalParks.length > 0) {
      setParkIsLoading(false);
      setPark(allNationalParks.filter((park) => park.parkCode === parkCode)[0]);
    } else {
      getParkByCode(parkCode)
        .then((response) => {
          if (response.status === 429) {
            setWasError429(true);
          }
          return response.text();
        })
        .then((result) => setPark(JSON.parse(result).data[0]))
        .catch((error) => console.log(error))
        .finally(() => setParkIsLoading(false));
    }
  }, [park, allNationalParks, parkCode]);

  // Get park's current weather:
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (park) {
      getParkCurrentWeather(park.latitude, park.longitude)
        .then((response) => {
          if (!response.ok) {
            setWasErrorFetchingWeather(true);
          }
          return response.text();
        })
        .then((result) => setParkWeather(JSON.parse(result)))
        .catch((error) => console.log(error));
    }
  }, [park]);

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

  // Process of adding '&' to last item in locations array if park is located in 2+ territories/states:
  // EX: Michigan & Wisconsin
  // EX: Alaska
  // EX: Colorado, Arizona, & New Mexico
  const inStates: boolean | undefined = parkStates && parkStates.length > 0;
  const inTerritories: boolean | undefined =
    parkTerritories && parkTerritories.length > 0;
  // Set initial value (most likely case):
  let locations: string[] | undefined = parkStates;
  // Concat parkStates & parkTerritories arrays if park's in at least one state and at least one territory:
  if (inStates && inTerritories && parkTerritories) {
    locations = parkStates?.concat(parkTerritories);
    // Else, set to parkTerritories if only in territories and no states:
  } else if (inTerritories && !inStates) {
    locations = parkTerritories;
  }
  let lastLocation: string;
  if (locations && locations.length > 1) {
    // Get last element in locations array:
    lastLocation = locations[locations.length - 1];
    // Get array of locations excluding lastLocation:
    locations = locations.filter((location) => location !== lastLocation);
    // Add " & " to lastLocation:
    lastLocation = ` & ${lastLocation}`;
    // Add lastLocation to end of locations array:
    locations.push(lastLocation);
  }

  // combine state & territory indices for current park into one array (exist in API as strings, not string[]):
  let stateTerritoryIndices: string[] = [];
  if (stateIndices && territoryIndices) {
    stateTerritoryIndices = stateIndices.concat(territoryIndices);
  }

  // Get array of parks in same state/territory as current park, if any:
  const nearbyParks: TPark[] = [];
  if (stateTerritoryIndices) {
    /* Check if array of state/territory indices of each other park includes any state/territory index of current park: */
    for (const index of stateTerritoryIndices) {
      for (const otherPark of allNationalParks) {
        const otherParkStateIndices: string[] | undefined = otherPark?.states
          .replace(/,/g, " ")
          .split(" ")
          .filter((otherParkStateIndex) =>
            Object.keys(stateFilterOptions).includes(otherParkStateIndex)
          );
        const otherParkTerritoryIndices: string[] | undefined = otherPark?.states
          .replace(/,/g, " ")
          .split(" ")
          .filter((otherParkTerritoryIndex) =>
            Object.keys(territoryFilterOptions).includes(otherParkTerritoryIndex)
          );
        const otherParkAllIndices = otherParkStateIndices?.concat(
          otherParkTerritoryIndices
        );
        /* If any index in state/territory array of current park is included in array of state/territory indices of any other park, add this other park to nearbyParks array: */
        if (
          otherParkAllIndices?.includes(index) &&
          otherPark.parkCode !== park?.parkCode
        ) {
          nearbyParks.push(otherPark);
        }
      }
    }
  }

  return (
    <>
      <NavBar notOnHomepage={true} notOnQuizPage={true} />
      <div className="park-page-main-content-container">
        {!park && parkIsLoading && <LoadingMessage />}
        {park && !parkIsLoading && (
          <>
            <div className="park-page-headers-container">
              <h1>{formatTitleCapitalization(park?.fullName)}</h1>
              <p>
                Located in{" "}
                {locations && locations.length > 2 ? locations.join(", ") : locations}
              </p>
              <p className="longitude-latitude">
                Longitude: {`${park?.longitude}`} | Latitude: {`${park?.latitude}`}
              </p>
              <div className="park-google-maps-current-weather-alerts-container">
                <p
                  title={areAlerts ? "Click to see alerts for this park" : undefined}
                  onClick={areAlerts ? () => setShowAlerts(true) : undefined}
                  className={areAlerts ? "show-modal-open-google-maps" : undefined}
                >
                  {areAlerts ? "See Current Alerts" : "No Current Alerts"}
                </p>
                <p
                  className="show-modal-open-google-maps"
                  title="Click to see this park's current weather"
                  onClick={() => setShowCurrentWeather(true)}
                >
                  See Current Weather
                </p>
                <a
                  title="Click to open this park's Google Maps page in a new tab"
                  className="show-modal-open-google-maps"
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${park.fullName
                    .toLowerCase()
                    .replace(/\s/g, "+")}`}
                >
                  See on Google Maps
                </a>
              </div>
            </div>
            <div className="park-page-main-content-container">
              <div className="park-page-top-section">
                <div className="park-page-img-slideshow-container">
                  <ImageSlideshow
                    images={park.images}
                    showCaption={true}
                    parkCode={parkCode}
                    onHomepage={false}
                  />
                </div>
                <div className="park-basic-info-container">
                  <header>Description</header>
                  <p>{park.description}</p>
                  <header>General Weather Info</header>
                  <p>{park.weatherInfo}</p>
                </div>
              </div>
              {showAlerts && (
                <ParkAlerts
                  parkName={park.fullName}
                  setShowAlerts={setShowAlerts}
                  parkCode={parkCode}
                />
              )}
              {showCurrentWeather && (
                <ParkCurrentWeather
                  setShowCurrentWeather={setShowCurrentWeather}
                  parkWeather={parkWeather}
                  parkName={park.fullName}
                  wasErrorFetchingWeather={wasErrorFetchingWeather}
                  parkImages={park.images}
                />
              )}
              <div className="park-page-bottom-section">
                <DropdownButton
                  text="Activities"
                  action={() => setShowActivities(!showActivities)}
                  title={showActivities ? "Hide Activities" : "Show Activities"}
                  showItems={showActivities}
                  numberOfItems={park?.activities.length}
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
                  title={showContactInfo ? "Hide Contact Info" : "Show Contact Info"}
                  showItems={showContactInfo}
                  numberOfItems={Object.keys(park.contacts).length}
                />
                <ParkContacts park={park} showContactInfo={showContactInfo} />
                {nearbyParks.length > 0 && (
                  <DropdownButton
                    text={nearbyParks.length === 1 ? "Nearby Park" : "Nearby Parks"}
                    action={() => setShowNearbyParks(!showNearbyParks)}
                    title={showNearbyParks ? "Hide Nearby Parks" : "Show Nearby Parks"}
                    showItems={showNearbyParks}
                    numberOfItems={nearbyParks.length}
                  />
                )}
                {nearbyParks.length > 0 && showNearbyParks && (
                  <div className="nearby-parks-container">
                    {nearbyParks.map((park: TPark) => (
                      <ParkCard key={park.id} park={park} parkCode={parkCode} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {!park && !parkIsLoading && <FailFetchMessage />}
        {!park && !parkIsLoading && wasError429 && (
          <FailFetchMessage isError429={wasError429} />
        )}
      </div>
      <UniversalFooter />
    </>
  );
};
export default ParkPage;
