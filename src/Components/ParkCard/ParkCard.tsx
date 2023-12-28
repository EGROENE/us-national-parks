import { useState } from "react";
import { TPark } from "../../types";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";
import { Link } from "react-router-dom";

type TDirection = "next" | "prev";

export const ParkCard = ({ park }: { park: TPark }) => {
  const [imgIndex, setImgIndex] = useState<number>(
    Math.floor(Math.random() * park.images.length)
  );

  const changeThumbnail = (
    direction: TDirection,
    imgIndex: number,
    imgArray: {
      credit: string;
      title: string;
      altText: string;
      caption: string;
      url: string;
    }[]
  ): void => {
    if (direction === "next") {
      imgIndex === imgArray.length - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
    } else {
      imgIndex === 0 ? setImgIndex(imgArray.length - 1) : setImgIndex(imgIndex - 1);
    }
  };

  const parkStates = (): string[] => {
    const stateIndices = park.states
      .replace(/,/g, " ")
      .split(" ")
      .filter((index) => Object.keys(stateFilterOptions).includes(index));
    return stateIndices.map((index) => stateFilterOptions[index]);
  };

  const parkTerritories = (): string[] => {
    const territoryIndices = park.states
      .replace(/,/g, " ")
      .split(" ")
      .filter((index) => Object.keys(territoryFilterOptions).includes(index));
    return territoryIndices.map((index) => territoryFilterOptions[index]);
  };

  // All possible combinations of where a park could be (in reality, only a couple of these will likely actually be used)
  // Ensures wording of state/territory labels are grammatically correct & appear only if park is in a state/territory
  const isInOneTerritoryAndOneState =
    parkStates().length === 1 && parkTerritories().length === 1;

  const isInSeveralTerritoriesAndOneState =
    parkTerritories().length > 1 && parkStates().length === 1;

  const isInSeveralStatesAndOneTerritory =
    parkStates().length > 1 && parkTerritories().length === 1;

  const isInOneTerritoryAndNoStates =
    parkTerritories().length === 1 && !parkStates().length;

  const isInSeveralTerritoriesAndNoStates =
    parkTerritories().length > 1 && !parkStates().length;

  const isInOneStateAndNoTerritories =
    parkStates().length === 1 && !parkTerritories().length;

  const isInSeveralStatesAndNoTerritories =
    parkStates().length > 1 && !parkTerritories().length;

  return (
    <div className="park-card">
      <div className="park-thumbnail-container">
        {park.images.length > 1 && (
          <i
            onClick={() => changeThumbnail("prev", imgIndex, park.images)}
            className="fas fa-angle-right"
            title="Previous Image"
          ></i>
        )}
        <img
          src={park.images[`${imgIndex}`].url}
          alt={park.images[`${imgIndex}`].altText}
        />
        {park.images.length > 1 && (
          <i
            onClick={() => changeThumbnail("next", imgIndex, park.images)}
            className="fas fa-angle-right"
            title="Next Image"
          ></i>
        )}
      </div>
      <Link to={`parks/${park.parkCode}`}>
        <header>{park.fullName}</header>
      </Link>
      <div className="state-list">
        {isInOneTerritoryAndOneState && <p>State: {parkStates().join(", ")}</p> && (
          <p>Territory: {parkTerritories().join(", ")}</p>
        )}
        {isInSeveralTerritoriesAndOneState && <p>State: {parkStates().join(", ")}</p> && (
          <p>Territories: {parkTerritories().join(", ")}</p>
        )}
        {isInSeveralStatesAndOneTerritory && <p>States: {parkStates().join(", ")}</p> && (
          <p>Territory: {parkTerritories().join(", ")}</p>
        )}
        {isInOneTerritoryAndNoStates && <p>Territory: {parkTerritories().join(", ")}</p>}
        {isInSeveralTerritoriesAndNoStates && (
          <p>Territories: {parkTerritories().join(", ")}</p>
        )}
        {isInOneStateAndNoTerritories && <p>State: {parkStates().join(", ")}</p>}
        {isInSeveralStatesAndNoTerritories && <p>States: {parkStates().join(", ")}</p>}
      </div>
      <p className="park-description">{park.description}</p>
    </div>
  );
};
