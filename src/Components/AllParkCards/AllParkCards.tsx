import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { TPark } from "../../types";
import { ParkCard } from "../ParkCard/ParkCard";

// map inside this comp to create ParkCard for every park currently in allNationalParks
export const AllParkCards = () => {
  const { allNationalParks, limit, setLimit } = useMainContentContext();
  const displayedParks = allNationalParks.filter(
    (park) => allNationalParks.indexOf(park) < limit
  );

  return (
    <>
      <div className="card-container">
        {displayedParks.map((park: TPark) => (
          <ParkCard park={park} />
        ))}
      </div>
      {displayedParks.length !== allNationalParks.length && (
        <button
          onClick={() => {
            limit < allNationalParks.length
              ? setLimit(limit + 18)
              : setLimit(allNationalParks.length);
          }}
        >
          Increase limit
        </button>
      )}
    </>
  );
};
