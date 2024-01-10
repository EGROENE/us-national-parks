import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { SearchResultsMessage } from "../SearchResultsMessage/SearchResultsMessage";

export const Search = () => {
  const { searchQuery, setSearchQuery, stateOrTerritoryFilter, handleSearchQuery } =
    useMainContentContext();
  const searchBarUsed = stateOrTerritoryFilter === "" && searchQuery !== "";
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          className="searchbox"
          onChange={(e) => handleSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Search parks"
          title="Search parks by name, description, weather info, activities, topics, longitude/latitude, or park code"
        ></input>
        <i
          title="Clear Search"
          className="fas fa-times"
          onClick={() => setSearchQuery("")}
        ></i>
      </div>
      {searchBarUsed && <SearchResultsMessage />}
    </div>
  );
};
