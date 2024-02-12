// Child comps: FilterFunctionality, SearchFunctionality
import Filter from "../../VersatileComponents/Filter/Filter";
import Search from "../Search/Search";

const SearchTools = () => {
  return (
    <div className="search-tools">
      <Filter />
      <Search />
    </div>
  );
};
export default SearchTools;
