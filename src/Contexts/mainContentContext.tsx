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

  const [displayedParks, setDisplayedParks] = useState<TPark[]>([]);

  const [totalNationalParks, setTotalNationalParks] = useState<number>(0);

  const [limit, setLimit] = useState<number>(6);

  const [stateFilter, setStateFilter] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");

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
        setTotalNationalParks(nationalParksArray.length);
        if (searchQuery === "" && stateFilter !== "") {
          setDisplayedParks(
            nationalParksArray.filter((park) =>
              park.states.replace(/,/g, " ").split(" ").includes(stateFilter)
            )
          );
        } else if (searchQuery !== "" && stateFilter === "") {
          setDisplayedParks(
            nationalParksArray.filter((park) =>
              park.fullName.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        } else {
          setDisplayedParks(
            nationalParksArray.filter((park) => nationalParksArray.indexOf(park) < limit)
          );
        }
      })
      .catch((error) => {
        setSuccessfulInitFetch(false);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [displayedParks, limit, searchQuery, stateFilter]);

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
    totalNationalParks,
    setTotalNationalParks,
  };

  return (
    <MainContentContext.Provider value={mainContentContextValues}>
      {children}
    </MainContentContext.Provider>
  );
};
