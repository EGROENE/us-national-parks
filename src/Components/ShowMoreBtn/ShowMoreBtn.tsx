import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const ShowMoreBtn = () => {
  const { limit, setLimit, totalNationalParks } = useMainContentContext();
  return (
    <button
      onClick={() => {
        limit < totalNationalParks ? setLimit(limit + 6) : setLimit(totalNationalParks);
      }}
    >
      Show More
    </button>
  );
};
