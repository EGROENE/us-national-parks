import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { getParkByCode } from "../../api";
import { TPark } from "../../types";
import { ImageSlideshow } from "../ImageSlideshow/ImageSlideshow";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";
import { LoadingMessage } from "../LoadingMessage/LoadingMessage";
import { FailInitFetchMessage } from "../FailInitFetchMessage/FailInitFetchMessage";
import { DropdownButton } from "../DropdownButton/DropdownButton";
import { ParkActivities } from "../ParkPageItems/ParkActivities/ParkActivities";
import { ParkEntranceFees } from "../ParkPageItems/ParkEntranceFees/ParkEntranceFees";

export const ParkPage = () => {
  const { parkCode } = useParams();

  const [park, setPark] = useState<TPark>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [successfulFetch, setSuccessfulFetch] = useState<boolean>(false);
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const [showEntranceFees, setShowEntranceFees] = useState<boolean>(false);
  const [showEntrancePasses, setShowEntrancePasses] = useState<boolean>(false);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);

  document.title = `${park?.fullName}`;

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
  }, [parkCode, park]);

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
                </div>
              </div>
              <div className="park-page-bottom-section">
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
                {showEntrancePasses && park.entrancePasses.length && (
                  <div className="entrance-fee-or-passes-container">
                    {park.entrancePasses.map((pass) => (
                      <div
                        key={park.entrancePasses[park.entrancePasses.indexOf(pass)].title}
                        className="entrance-fee-or-pass"
                      >
                        <header>{pass.title}</header>
                        <p>{+pass.cost === 0 ? "FREE" : `$${pass.cost}`}</p>
                        <p>{pass.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {!park.entrancePasses.length && <span>NONE</span>}
                <DropdownButton
                  text="Contact Info"
                  action={() =>
                    showContactInfo ? setShowContactInfo(false) : setShowContactInfo(true)
                  }
                  title={showContactInfo ? "Hide Contact Info" : "Hide Contact Info"}
                  showItems={showContactInfo}
                  numberOfItems={Object.keys(park.contacts).length}
                />
                {showContactInfo && Object.keys(park.contacts).length > 0 && (
                  <div className="contact-infos-container">
                    <header>
                      Phone Numbers:
                      {park.contacts.phoneNumbers.map((numberInfo) => (
                        <span key={numberInfo.phoneNumber}>
                          {`${numberInfo.phoneNumber} `}
                          {numberInfo.type.toUpperCase() !== "TTY"
                            ? `(${numberInfo.type})`
                            : "(Teletypewriter)"}
                        </span>
                      ))}
                    </header>
                    <header>
                      E-Mail Address:{" "}
                      <span>{park.contacts.emailAddresses[0].emailAddress}</span>
                    </header>
                  </div>
                )}
                {!Object.keys(park.contacts).length && <p>NONE</p>}
              </div>
            </div>
          )}
        </>
      )}
      {!isLoading && !successfulFetch && <FailInitFetchMessage />}
    </>
  );
};
