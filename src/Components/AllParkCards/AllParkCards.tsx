import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { TPark } from "../../types";
import { ParkCard } from "../ParkCard/ParkCard";
import { ShowMoreBtn } from "../ShowMoreBtn/ShowMoreBtn";

// map inside this comp to create ParkCard for every park currently in allNationalParks
export const AllParkCards = () => {
  const { allNationalParks, limit } = useMainContentContext();
  const displayedParks = allNationalParks.filter(
    (park) => allNationalParks.indexOf(park) < limit
  );

  return (
    <>
      <div className="card-container">
        {displayedParks.map((park: TPark) => (
          <ParkCard key={park.id} park={park} />
        ))}
      </div>
      {displayedParks.length !== allNationalParks.length && <ShowMoreBtn />}
    </>
  );
};
