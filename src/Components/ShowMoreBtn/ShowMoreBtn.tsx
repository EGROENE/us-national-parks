import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { TPark } from "../../types";

export const ShowMoreBtn = ({
  limit,
  allNationalParks,
}: {
  limit: number;
  allNationalParks: TPark[];
}) => {
  const { setLimit } = useMainContentContext();
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
