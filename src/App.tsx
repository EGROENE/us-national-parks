import "./App.css";
import { useState, useEffect, createContext } from "react";
import { HomepageMainContent } from "./Components/HomepageMainContent/HomepageMainContent";
import { getParks } from "./api";
import { TPark, TParkDisplayLimit } from "./types";

const MainContentContext = createContext(null);

const getParksSortedAlphabeticallyByFullName = (array: Array<TPark>) => {
  // Type a & b as Park type
  return array.sort(function (a, b) {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  });
};

// If, when retrieving all parks, !request.ok, don't display HomepageMainContent component, rather comp w/ msg & reload btn

function App() {
  // Type displayedParks as Park, defined in separate file
  // AllParkCards will need access to this. Use Context API to share values.
  const [displayedParks, setDisplayedParks] = useState<TPark[]>([]);

  // Set limit when scrolling to certain point or when 'load more' btn is clicked
  // Will be used to limit number of parks from displayedParks will display
  // rows of 6
  // limit type should be a number that's either 18, 36, 54, or 60
  const [limit, setLimit] = useState<TParkDisplayLimit>(18);

  // In useEffect, set initial value of displayedParks
  useEffect(() => {
    getParks()
      .then((response) => response.text())
      .then((result) => {
        const parksJSArray: TPark[] = JSON.parse(result).data;
        const nationalParksArray: TPark[] = getParksSortedAlphabeticallyByFullName(
          parksJSArray
            .filter((park) => park.designation.includes("National Park"))
            .concat(
              parksJSArray.filter((park) =>
                park.designation.includes("National and State Parks")
              )
            )
        );
        setDisplayedParks(nationalParksArray);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const mainContentContextValues = {
    displayedParks,
  };

  return (
    <>
      {/* navbar */}
      {/* While data is fetching, display msg & animated icon (while isLoading in state is truthy) */}
      {/* HomepageMainContent = SearchTools + AllParksCards OR comp w/ 'failed to retrieve data' & reload btn*/}
      {/* Use children param for HomepageMainContent. Children are desc above. Put 'load more' btn after children here, as long as displayedParks.length < allParks.length, both of which should be derived values here. */}
      <MainContentContext.Provider value={mainContentContextValues}>
        <HomepageMainContent />
      </MainContentContext.Provider>
    </>
  );
}

export default App;
