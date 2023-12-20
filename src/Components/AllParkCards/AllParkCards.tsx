import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { TPark } from "../../types";
import { ParkCard } from "../ParkCard/ParkCard";
import { ShowMoreBtn } from "../ShowMoreBtn/ShowMoreBtn";
import { statesArray } from "../../constants";

// map inside this comp to create ParkCard for every park currently in allNationalParks
export const AllParkCards = () => {
  const { allNationalParks, limit, stateFilter } = useMainContentContext();
  const displayedParks =
    stateFilter === ""
      ? allNationalParks.filter((park) => allNationalParks.indexOf(park) < limit)
      : allNationalParks.filter((park) =>
          park.states.replace(/,/g, " ").split(" ").includes(stateFilter)
        );

  return (
    <>
      <div className="card-container">
        {displayedParks.map((park: TPark) => (
          <ParkCard key={park.id} park={park} />
        ))}
      </div>
      {displayedParks.length !== allNationalParks.length && stateFilter === "" && (
        <ShowMoreBtn />
      )}
      {stateFilter !== "" && !displayedParks.length && (
        <header>No national parks exist in {statesArray[`${stateFilter}`]}.</header>
      )}
    </>
  );
};
