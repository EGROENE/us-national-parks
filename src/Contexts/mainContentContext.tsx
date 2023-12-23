// Remember, this file contains MainContentContext, which will need to be consumed in hook file
// Also contains provider that should wrap App inside main.tsx. this provider shares necessary state values, etc.
import { createContext, ReactNode, useEffect, useState } from "react";
import { TPark, TMainContentContext } from "../types";
import { getParks } from "../api";

export const MainContentContext = createContext<TMainContentContext | null>(null);

export const MainContentContextProvider = ({ children }: { children: ReactNode }) => {
  const getParksSortedAlphabeticallyByFullName = (array: Array<TPark>) => {
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

  const [successfulInitFetch, setSuccessfulInitFetch] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [allNationalParks, setAllNationalParks] = useState<TPark[]>([]);

  const [displayedParks, setDisplayedParks] = useState<TPark[]>([]);

  const [limit, setLimit] = useState<number>(6);

  const [stateFilter, setStateFilter] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");

  // This useEffect is to handle initial data request. If it is successful, allNationalParks is set once and for all.
  // Is called only on loading of page in order to minimize amount of requests made to API.
  useEffect(() => {
    getParks()
      .then((response) => response.text())
      .then((result) => {
        setSuccessfulInitFetch(true);
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
        setAllNationalParks(nationalParksArray);
      })
      .catch((error) => {
        setSuccessfulInitFetch(false);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // This useEffect is to set displayedParks anew every time a pertinent state value changes.
  // displayedParks must be dependent on allNationalParks, which is set once & for all upon page load, in order to minimize API requests.
  // All this functionality is put into useEffect in order to prevent to many renders.
  useEffect(() => {
    if (searchQuery === "" && stateFilter !== "") {
      setDisplayedParks(
        allNationalParks.filter((park) =>
          park.states.replace(/,/g, " ").split(" ").includes(stateFilter)
        )
      );
    } else if (searchQuery !== "" && stateFilter === "") {
      const searchQueryCI = searchQuery.toLowerCase();
      const newDisplayedParks = [];

      const parkContainsSearchedActivityOrTopic = (park: TPark): boolean => {
        const activities: string[] = park.activities.map((activity) =>
          activity.name.toLowerCase()
        );
        const topics: string[] = park.topics.map((topic) => topic.name.toLowerCase());
        if (topics.includes(searchQueryCI) || activities.includes(searchQueryCI)) {
          return true;
        }
        return false;
      };

      for (const park of allNationalParks) {
        if (
          park.fullName.toLowerCase().includes(searchQueryCI) ||
          park.description.toLowerCase().includes(searchQueryCI) ||
          park.latitude.includes(searchQuery) ||
          park.longitude.includes(searchQuery) ||
          park.parkCode.toLowerCase().includes(searchQueryCI) ||
          park.weatherInfo.toLowerCase().includes(searchQueryCI) ||
          parkContainsSearchedActivityOrTopic(park)
        ) {
          newDisplayedParks.push(park);
        }
        setDisplayedParks(newDisplayedParks);
      }
    } else {
      setDisplayedParks(
        allNationalParks.filter((park) => allNationalParks.indexOf(park) < limit)
      );
    }
  }, [allNationalParks, limit, stateFilter, searchQuery]);

  const handleStateFilter = (value: string): void => {
    if (searchQuery !== "") {
      setSearchQuery("");
    }
    setStateFilter(value);
  };

  const handleSearchQuery = (value: string): void => {
    if (stateFilter !== "") {
      setStateFilter("");
    }
    setSearchQuery(value);
  };

  // Eventually check if all these are actually used
  const mainContentContextValues: TMainContentContext = {
    allNationalParks,
    displayedParks,
    limit,
    setLimit,
    isLoading,
    setIsLoading,
    successfulInitFetch,
    setSuccessfulInitFetch,
    stateFilter,
    setStateFilter,
    searchQuery,
    setSearchQuery,
    handleStateFilter,
    handleSearchQuery,
  };

  return (
    <MainContentContext.Provider value={mainContentContextValues}>
      {children}
    </MainContentContext.Provider>
  );
};
