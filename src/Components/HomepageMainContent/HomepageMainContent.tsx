// AllParkCards (child ParkCard) & SearchTools should be this comp's children
import { useEffect, useState } from "react";
import { AllParkCards } from "../AllParkCards/AllParkCards";
import { ScrollToTopBtn } from "../ScrollToTopBtn/ScrolltoTopBtn";

export const HomepageMainContent = () => {
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
      <AllParkCards />
      <ScrollToTopBtn distanceScrolledFromTop={distanceScrolledFromTop} />
    </>
  );
};
