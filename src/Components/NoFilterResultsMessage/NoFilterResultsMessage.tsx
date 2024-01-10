import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { stateFilterOptions, territoryFilterOptions } from "../../constants";

export const NoFilterResultsMessage = () => {
  const { stateOrTerritoryFilter } = useMainContentContext();
  return Object.keys(territoryFilterOptions).indexOf(stateOrTerritoryFilter) !== -1 ? (
    <p>{`No national parks exist in ${
      territoryFilterOptions[
        `${stateOrTerritoryFilter as keyof typeof territoryFilterOptions}`
      ]
    }`}</p>
  ) : (
    <p>{`No national parks exist in ${
      stateFilterOptions[`${stateOrTerritoryFilter as keyof typeof stateFilterOptions}`]
    }`}</p>
  );
};
