import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { TPark } from "../../types";
import { ParkCard } from "../ParkCard/ParkCard";

// map inside this comp to create ParkCard for every park currently in allNationalParks
export const AllParkCards = () => {
  const { allNationalParks } = useMainContentContext();
  return (
    <>
      {allNationalParks.map((park: TPark) => (
        <ParkCard park={park} />
      ))}
    </>
  );
};
