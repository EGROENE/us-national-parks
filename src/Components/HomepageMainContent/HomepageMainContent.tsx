// AllParkCards (child ParkCard) & SearchTools should be this comp's children
import { useEffect, useState } from "react";
import { AllParkCards } from "../AllParkCards/AllParkCards";
import { ScrollToTopBtn } from "../ScrollToTopBtn/ScrollToTopBtn";
import { SearchTools } from "../SearchTools/SearchTools";
import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { SearchResultsMessage } from "../SearchResultsMessage/SearchResultsMessage";
import { statesArray } from "../../constants";

export const HomepageMainContent = () => {
  const { successfulInitFetch, stateFilter, searchQuery, displayedParks } =
    useMainContentContext();
  const [distanceScrolledFromTop, setDistanceScrolledFromTop] = useState<number>(0);

  const filterUsed = stateFilter !== "NONE" && searchQuery === "";
  const searchBarUsed = stateFilter === "NONE" && searchQuery !== "";

  // Remember, any time useEffect adds an EL, it should be removed in its 'return' statement
  useEffect(() => {
    const handleScroll = () => {
      setDistanceScrolledFromTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {successfulInitFetch && <SearchTools />}
      {searchBarUsed && <SearchResultsMessage />}
      <AllParkCards />
      {filterUsed &&
        !displayedParks.length &&
        `No national parks exist in ${statesArray[`${stateFilter}`]}`}
      <ScrollToTopBtn distanceScrolledFromTop={distanceScrolledFromTop} />
    </>
  );
};
