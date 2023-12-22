import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { TPark } from "../../types";
import { ParkCard } from "../ParkCard/ParkCard";
import { ShowMoreBtn } from "../ShowMoreBtn/ShowMoreBtn";
import { statesArray } from "../../constants";

// map inside this comp to create ParkCard for every park currently in allNationalParks
export const AllParkCards = () => {
  const { allNationalParks, stateFilter, searchQuery, displayedParks } =
    useMainContentContext();

  return (
    <>
      <div className="card-container">
        {displayedParks.map((park: TPark) => (
          <ParkCard key={park.id} park={park} />
        ))}
      </div>
      {displayedParks.length !== allNationalParks.length &&
        stateFilter === "NONE" &&
        searchQuery === "" && <ShowMoreBtn />}
      {stateFilter !== "NONE" && !displayedParks.length && searchQuery === "" && (
        <header>No national parks exist in {statesArray[`${stateFilter}`]}.</header>
      )}
    </>
  );
};
