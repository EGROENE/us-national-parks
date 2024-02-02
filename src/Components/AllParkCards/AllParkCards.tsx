import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { TPark } from "../../types";
import { ParkCard } from "../ParkCard/ParkCard";
import { ShowMoreBtn } from "../ShowMoreBtn/ShowMoreBtn";

// map inside this comp to create ParkCard for every park currently in displayedParks
export const AllParkCards = () => {
  const { displayedParks, stateOrTerritoryFilter, searchQuery, allNationalParks } =
    useMainContentContext();

  // If not all parks are displayed, & no filter or search query exists, 'show more' button should display
  const displayShowMoreBtn: boolean =
    allNationalParks.length !== displayedParks.length &&
    stateOrTerritoryFilter === "" &&
    searchQuery === "";

  return (
    <>
      <div className="card-container">
        {displayedParks.map((park: TPark) => (
          <ParkCard key={park.id} park={park} showDescription={true} />
        ))}
      </div>
      {displayShowMoreBtn && <ShowMoreBtn />}
    </>
  );
};
