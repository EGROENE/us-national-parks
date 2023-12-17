// Remember, this file contains MainContentContext, which will need to be consumed in hook file
// Also contains provider that should wrap App inside main.tsx. this provider shares necessary state values, etc.
import { createContext, ReactNode, useEffect, useState } from "react";
import { TPark, TMainContentContext } from "../types";
import { getParks } from "../api";

// Make sure to type this correctly
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

  const [limit, setLimit] = useState<number>(9);

  // In useEffect, set initial value of allNationalParks
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
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const mainContentContextValues: TMainContentContext = {
    allNationalParks,
    limit,
    setLimit,
    isLoading,
    setIsLoading,
    successfulInitFetch,
    setSuccessfulInitFetch,
  };

  return (
    <MainContentContext.Provider value={mainContentContextValues}>
      {children}
    </MainContentContext.Provider>
  );
};
