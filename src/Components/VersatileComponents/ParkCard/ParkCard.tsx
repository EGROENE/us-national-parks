import { Link } from "react-router-dom";

// Type(s):
import { TPark } from "../../../types";

// Constants:
import { stateFilterOptions, territoryFilterOptions } from "../../../constants";

// Component(s):
import ImageSlideshow from "../ImageSlideshow/ImageSlideshow";

const ParkCard = ({
  park,
  showDescription,
}: {
  park: TPark;
  showDescription?: boolean;
}) => {
  const stateIndices: string[] = park.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(stateFilterOptions).includes(index));
  const parkStates: string[] = stateIndices.map(
    (index) => stateFilterOptions[index as keyof typeof stateFilterOptions]
  );

  const territoryIndices: string[] = park.states
    .replace(/,/g, " ")
    .split(" ")
    .filter((index) => Object.keys(territoryFilterOptions).includes(index));
  const parkTerritories: string[] = territoryIndices.map(
    (index) => territoryFilterOptions[index as keyof typeof territoryFilterOptions]
  );

  // All possible combinations of where a park could be (in reality, only a couple of these will likely actually be used)
  // Ensures wording of state/territory labels are grammatically correct & appear only if park is in a state/territory
  const isInOneTerritoryAndOneState: boolean =
    parkStates.length === 1 && parkTerritories.length === 1;

  const isInSeveralTerritoriesAndOneState =
    parkTerritories.length > 1 && parkStates.length === 1;

  const isInSeveralStatesAndOneTerritory: boolean =
    parkStates.length > 1 && parkTerritories.length === 1;

  const isInOneTerritoryAndNoStates: boolean =
    parkTerritories.length === 1 && !parkStates.length;

  const isInSeveralTerritoriesAndNoStates: boolean =
    parkTerritories.length > 1 && !parkStates.length;

  const isInOneStateAndNoTerritories: boolean =
    parkStates.length === 1 && !parkTerritories.length;

  const isInSeveralStatesAndNoTerritories: boolean =
    parkStates.length > 1 && !parkTerritories.length;

  return (
    <div className="park-card">
      <div className="homepage-park-slideshow-container">
        <ImageSlideshow park={park} showCaption={false} />
      </div>
      <header>{park.fullName}</header>
      <div className="state-list">
        {isInOneTerritoryAndOneState && <p>State: {parkStates.join(", ")}</p> && (
          <p>Territory: {parkTerritories.join(", ")}</p>
        )}
        {isInSeveralTerritoriesAndOneState && <p>State: {parkStates.join(", ")}</p> && (
          <p>Territories: {parkTerritories.join(", ")}</p>
        )}
        {isInSeveralStatesAndOneTerritory && <p>States: {parkStates.join(", ")}</p> && (
          <p>Territory: {parkTerritories.join(", ")}</p>
        )}
        {isInOneTerritoryAndNoStates && <p>Territory: {parkTerritories.join(", ")}</p>}
        {isInSeveralTerritoriesAndNoStates && (
          <p>Territories: {parkTerritories.join(", ")}</p>
        )}
        {isInOneStateAndNoTerritories && <p>State: {parkStates.join(", ")}</p>}
        {isInSeveralStatesAndNoTerritories && <p>States: {parkStates.join(", ")}</p>}
      </div>
      {showDescription && <p className="park-description">{park.description}</p>}
      <Link to={`/parks/${park.parkCode}`}>
        <button title={`Learn more about ${park.fullName}`} className="learn-more-btn">
          Learn More
        </button>
      </Link>
    </div>
  );
};
export default ParkCard;
