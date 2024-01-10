import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";

export const NoFilterResultsMessage = () => {
  const { stateFilter } = useMainContentContext();
  return Object.keys(territoryFilterOptions).indexOf(stateFilter) !== -1 ? (
    <p>{`No national parks exist in ${
      territoryFilterOptions[`${stateFilter as keyof typeof territoryFilterOptions}`]
    }`}</p>
  ) : (
    <p>{`No national parks exist in ${
      stateFilterOptions[`${stateFilter as keyof typeof stateFilterOptions}`]
    }`}</p>
  );
};
