import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { SearchResultsMessage } from "../SearchResultsMessage/SearchResultsMessage";

export const Search = () => {
  const { searchQuery, stateFilter, handleSearchQuery } = useMainContentContext();
  const searchBarUsed = stateFilter === "" && searchQuery !== "";
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          className="searchbox"
          onChange={(e) => handleSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Search parks"
        ></input>
        <i className="fas fa-times"></i>
      </div>
      {searchBarUsed && <SearchResultsMessage />}
    </div>
  );
};
