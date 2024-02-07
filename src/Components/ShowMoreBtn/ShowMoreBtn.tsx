import { useMainContentContext } from "../../Hooks/useMainContentContext";

const ShowMoreBtn = () => {
  const { limit, setLimit, allNationalParks } = useMainContentContext();
  return (
    <button
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
export default ShowMoreBtn;
