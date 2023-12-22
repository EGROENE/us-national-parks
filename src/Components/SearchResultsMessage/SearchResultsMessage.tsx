import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const SearchResultsMessage = () => {
  const { displayedParks } = useMainContentContext();

  if (displayedParks.length) {
    if (displayedParks.length === 1) {
      return <p>Your search yielded 1 result</p>;
    }
    if (displayedParks.length > 1) {
      return <p>{`Your search yielded ${displayedParks.length} results`}</p>;
    }
  }
  return <p>Your search didn't yield any results</p>;
};
