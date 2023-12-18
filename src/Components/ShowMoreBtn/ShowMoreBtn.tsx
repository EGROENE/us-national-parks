import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const ShowMoreBtn = () => {
  const { limit, setLimit, allNationalParks } = useMainContentContext();
  return (
    <button
      title="Show More Parks"
      onClick={() => {
        limit < allNationalParks.length
          ? setLimit(limit + 6)
          : setLimit(allNationalParks.length);
      }}
    >
      Show More
    </button>
  );
};
