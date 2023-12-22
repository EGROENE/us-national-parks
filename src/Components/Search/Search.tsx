import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const Search = () => {
  const { searchQuery, handleSearchQuery } = useMainContentContext();
  return (
    <input
      type="text"
      className="searchbox"
      onChange={(e) => handleSearchQuery(e.target.value)}
      value={searchQuery}
    ></input>
  );
};
