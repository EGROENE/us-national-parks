import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { getParkByCode } from "../../api";
import { TPark } from "../../types";
import { ImageSlideshow } from "../ImageSlideshow/ImageSlideshow";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";
import { LoadingMessage } from "../LoadingMessage/LoadingMessage";
import { FailInitFetchMessage } from "../FailInitFetchMessage/FailInitFetchMessage";
import { getObjectArraySortedAlphabeticallyByProperty } from "../../methods";

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
                    {getObjectArraySortedAlphabeticallyByProperty(
                      park.activities,
                      "name"
                    ).map((activity) => (
                      <p
                        key={park.activities[park.activities.indexOf(activity)].id}
                        className="park-activity"
                      >
                        {activity.name}
                      </p>
                    ))}
                  </div>
                )}
                <button
                  onClick={
                    park.entranceFees.length > 0
                      ? () =>
                          showEntranceFees
                            ? setShowEntranceFees(false)
                            : setShowEntranceFees(true)
                      : undefined
                  }
                  title={showEntranceFees ? "Hide Entrance Fees" : "Show Entrance Fees"}
                >
                  <p>Entrance Fees</p>
                  {park.entranceFees.length > 0 && (
                    <i
                      style={{ rotate: showEntranceFees ? "0deg" : "90deg" }}
                      className="fas fa-angle-right"
                    ></i>
                  )}
                </button>
                {showEntranceFees && park.entranceFees.length && (
                  <div className="entrance-fee-or-passes-container">
                    {park.entranceFees.map((entranceFee) => (
                      <div
                        key={
                          park.entranceFees[park.entranceFees.indexOf(entranceFee)].title
                        }
                        className="entrance-fee-or-pass"
                      >
                        <header>{entranceFee.title}</header>
                        <p>{+entranceFee.cost === 0 ? "FREE" : `$${entranceFee.cost}`}</p>
                        <p>{entranceFee.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {!park.entranceFees.length && <p>NONE</p>}
                <button
                  onClick={
                    park.entrancePasses.length > 0
                      ? () =>
                          showEntrancePasses
                            ? setShowEntrancePasses(false)
                            : setShowEntrancePasses(true)
                      : undefined
                  }
                  title={
                    showEntrancePasses ? "Hide Available Passes" : "Show Available Passes"
                  }
                >
                  <p>Available Passes</p>
                  {park.entrancePasses.length > 0 && (
                    <i
                      style={{ rotate: showEntrancePasses ? "0deg" : "90deg" }}
                      className="fas fa-angle-right"
                    ></i>
                  )}
                </button>
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
                {!park.entrancePasses.length && <p>NONE</p>}
                <button
                  onClick={
                    Object.keys(park.contacts).length > 0
                      ? () =>
                          showContactInfo
                            ? setShowContactInfo(false)
                            : setShowContactInfo(true)
                      : undefined
                  }
                  title={showContactInfo ? "Hide Contact Info" : "Hide Contact Info"}
                >
                  <p>Contact Info</p>
                  {Object.keys(park.contacts).length > 0 && (
                    <i
                      style={{ rotate: showContactInfo ? "0deg" : "90deg" }}
                      className="fas fa-angle-right"
                    ></i>
                  )}
                </button>
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
