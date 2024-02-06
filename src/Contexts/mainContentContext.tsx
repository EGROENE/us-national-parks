import { createContext, ReactNode, useEffect, useState } from "react";
import { TPark, TMainContentContext, TParkAlert } from "../types";
import { getParks, getAllNPAlerts } from "../api";
import { getObjectArraySortedAlphabeticallyByProperty } from "../methods";

export const MainContentContext = createContext<TMainContentContext | null>(null);

export const MainContentContextProvider = ({ children }: { children: ReactNode }) => {
  // Values relating to data displayed on homepage:
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allNationalParks, setAllNationalParks] = useState<TPark[]>([]);
  const [displayedParks, setDisplayedParks] = useState<TPark[]>([]);
  const [limit, setLimit] = useState<number>(6);
  const [isError429, setIsError429] = useState<boolean>(false);

  // Values relating to search & filter functionalities on homepage:
  const [stateOrTerritoryFilter, setStateOrTerritoryFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Values relating to national park alerts:
  const [allNPAlerts, setAllNPAlerts] = useState<TParkAlert[]>([]);
  const [alertsAreLoading, setAlertsAreLoading] = useState<boolean>(true);

  // This useEffect is to handle initial data request. If it is successful, allNationalParks is set once and for all.
  // Is called only on loading of app in order to minimize amount of requests made to API.
  useEffect(() => {
    getParks()
      .then((response) => {
        if (response.status === 429) {
          setIsError429(true);
        }
        return response.text();
      })
      .then((result) => {
        const parksJSArray: TPark[] = JSON.parse(result).data;
        const nationalParksArray = getObjectArraySortedAlphabeticallyByProperty(
          parksJSArray
            .filter((park) => park.designation.includes("National Park"))
            .concat(
              parksJSArray.filter((park) =>
                park.designation.includes("National and State Parks")
              )
            ),
          "fullName"
        );
        /* @ts-expect-error: allNationalParks should only be of type TPark[], not of any other type of object array. allNationalParks is being set here to nationalParksArray, the result of getObjectArraySortedAlphabeticallyByProperty(), which can be either TPark[] or other types of object arrays. getObjectArraySortedAlphabeticallyByProperty() was created to serve as the only function necessary in this project to sort object arrays alphabetically by a passed-in property value. */
        setAllNationalParks(nationalParksArray);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // This useEffect is to set displayedParks anew every time a pertinent state value changes.
  // displayedParks must be dependent on allNationalParks, which is set once & for all upon page load, in order to minimize API requests.
  useEffect(() => {
    if (searchQuery === "" && stateOrTerritoryFilter !== "") {
      setDisplayedParks(
        allNationalParks.filter((park) =>
          park.states.replace(/,/g, " ").split(" ").includes(stateOrTerritoryFilter)
        )
      );
    } else if (searchQuery !== "" && stateOrTerritoryFilter === "") {
      // make search queary case-insensitive & replace any multiple spaces w/ single space:
      const searchQueryCI = searchQuery.toLowerCase().replace(/ +/g, " ");
      const newDisplayedParks = [];

      const queryIsTopicOrActivity = (park: TPark): boolean => {
        const activities: string[] = park.activities.map((activity) =>
          activity.name.toLowerCase()
        );

        let isActivity = false;
        for (const activity of activities) {
          if (
            activity.includes(searchQueryCI) ||
            activity.includes(searchQueryCI.trim())
          ) {
            isActivity = true;
          }
        }

        const topics: string[] = park.topics.map((topic) => topic.name.toLowerCase());

        let isTopic = false;
        for (const topic of topics) {
          if (topic.includes(searchQueryCI) || topic.includes(searchQueryCI.trim())) {
            isTopic = true;
          }
        }

        return isTopic || isActivity ? true : false;
      };

      for (const park of allNationalParks) {
        if (
          park.fullName.toLowerCase().includes(searchQueryCI) ||
          park.description.toLowerCase().includes(searchQueryCI) ||
          park.latitude.includes(searchQuery) ||
          park.longitude.includes(searchQuery) ||
          park.parkCode.toLowerCase().includes(searchQueryCI) ||
          park.weatherInfo.toLowerCase().includes(searchQueryCI) ||
          queryIsTopicOrActivity(park)
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
  }, [allNationalParks, limit, stateOrTerritoryFilter, searchQuery]);

  // Set allNPAlerts:
  /* Necessary to do it here "behind the scenes" & not in ParkPage or a child of it so that 429 error (too many requests) doesn't occur when rendering ParkPage */
  useEffect(() => {
    getAllNPAlerts()
      .then((response) => response.text())
      .then((result) => {
        const allNPParkCodes: string[] = allNationalParks.map((park) => park.parkCode);
        const allParkAlerts: TParkAlert[] = JSON.parse(result).data;
        setAllNPAlerts(
          allParkAlerts.filter((alert) => allNPParkCodes.includes(alert.parkCode))
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setAlertsAreLoading(false));
  }, [allNationalParks]);

  const successfulInitFetch = allNationalParks.length > 0;

  const handleStateFilter = (value: string): void => {
    if (searchQuery !== "") {
      setSearchQuery("");
    }
    setStateOrTerritoryFilter(value);
  };

  const handleSearchQuery = (value: string): void => {
    if (stateOrTerritoryFilter !== "") {
      setStateOrTerritoryFilter("");
    }
    setSearchQuery(value);
  };

  const mainContentContextValues: TMainContentContext = {
    successfulInitFetch,
    isError429,
    allNationalParks,
    displayedParks,
    limit,
    setLimit,
    isLoading,
    setIsLoading,
    stateOrTerritoryFilter,
    setStateOrTerritoryFilter,
    searchQuery,
    setSearchQuery,
    handleStateFilter,
    handleSearchQuery,
    allNPAlerts,
    alertsAreLoading,
  };

  return (
    <MainContentContext.Provider value={mainContentContextValues}>
      {children}
    </MainContentContext.Provider>
  );
};
