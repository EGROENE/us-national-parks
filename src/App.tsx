import "./App.css";
import { useState, useEffect, createContext } from "react";
import { HomepageMainContent } from "./Components/HomepageMainContent/HomepageMainContent";
import { getParks } from "./api";

const MainContentContext = createContext();

// If, when retrieving all parks, !request.ok, don't display HomepageMainContent component, rather comp w/ msg & reload btn

function App() {
  // Type displayedParks as Park, defined in separate file
  // AllParkCards will need access to this. Use Context API to share values.
  const [displayedParks, setDisplayedParks] = useState([]);

  // Set limit when scrolling to certain point or when 'load more' btn is clicked
  const [limit, setLimit] = useState<number>(9);

  // In useEffect, set initial value of displayedParks
  useEffect(() => {
    getParks(limit)
      .then((response) => response.text())
      .then((result) => setDisplayedParks(JSON.parse(result).data))
      .catch((error) => console.log("error", error));
  }, [limit]);

  const mainContentContextValues = {
    displayedParks,
  };

  return (
    <>
      {/* navbar */}
      {/* HomepageMainContent = SearchTools + AllParksCards OR comp w/ 'failed to retrieve data' & reload btn*/}
      {/* Use children param for HomepageMainContent. Children are desc above. Put 'load more' btn after children here, as long as displayedParks.length < allParks.length, both of which should be derived values here. */}
      <MainContentContext.Provider value={mainContentContextValues}>
        <HomepageMainContent />
      </MainContentContext.Provider>
    </>
  );
}

export default App;
