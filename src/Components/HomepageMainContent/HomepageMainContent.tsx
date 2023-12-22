import { useEffect, useState } from "react";
import { AllParkCards } from "../AllParkCards/AllParkCards";
import { ScrollToTopBtn } from "../ScrollToTopBtn/ScrollToTopBtn";
import { SearchTools } from "../SearchTools/SearchTools";
import { useMainContentContext } from "../../Hooks/useMainContentContext";
import { NoFilterResultsMessage } from "../NoFilterResultsMessage/NoFilterResultsMessage";

export const HomepageMainContent = () => {
  const { stateFilter, searchQuery, displayedParks } = useMainContentContext();
  const [distanceScrolledFromTop, setDistanceScrolledFromTop] = useState<number>(0);

  const filterUsed = stateFilter !== "" && searchQuery === "";

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
      <SearchTools />
      <AllParkCards />
      {filterUsed && !displayedParks.length && <NoFilterResultsMessage />}
      <ScrollToTopBtn distanceScrolledFromTop={distanceScrolledFromTop} />
    </>
  );
};
