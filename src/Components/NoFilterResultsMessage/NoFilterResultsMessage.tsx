import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { stateFilterOptions } from "../../constants";

export const NoFilterResultsMessage = () => {
  const { stateFilter } = useMainContentContext();
  return <p>{`No national parks exist in ${stateFilterOptions[`${stateFilter}`]}`}</p>;
};
