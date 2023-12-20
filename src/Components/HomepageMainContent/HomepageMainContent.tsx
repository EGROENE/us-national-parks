// AllParkCards (child ParkCard) & SearchTools should be this comp's children
import { useEffect, useState } from "react";
import { AllParkCards } from "../AllParkCards/AllParkCards";
import { ScrollToTopBtn } from "../ScrollToTopBtn/ScrollToTopBtn";
import { SearchTools } from "../SearchTools/SearchTools";
import { useMainContentContext } from "../../Hooks/useMainContentContext";

export const HomepageMainContent = () => {
  const { successfulInitFetch } = useMainContentContext();
  const [distanceScrolledFromTop, setDistanceScrolledFromTop] = useState<number>(0);

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
      <AllParkCards />
      <ScrollToTopBtn distanceScrolledFromTop={distanceScrolledFromTop} />
    </>
  );
};
