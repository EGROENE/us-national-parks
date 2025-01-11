// Child comps: FilterFunctionality, SearchFunctionality
import Filter from "../../VersatileComponents/Filter/Filter";
import Search from "../Search/Search";

const SearchTools = () => {
  return (
    <search className="search-tools">
      <Filter />
      <Search />
    </search>
  );
};
export default SearchTools;
