// Child comps: FilterFunctionality, SearchFunctionality
import { Filter } from "../Filter/Filter";
import { Search } from "../Search/Search";

export const SearchTools = () => {
  return (
    <div className="search-tools">
      <Filter />
      <Search />
    </div>
  );
};
