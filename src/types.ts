import { Dispatch, SetStateAction } from "react";
import { stateFilterOptions } from "./constants";

export interface TPark {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  activities: [{ id: string; name: string }];
  topics: [{ id: string; name: string }];
  states: string;
  contacts: {
    emailAddresses: { description: string; emailAddress: string }[];
    phoneNumbers: {
      phoneNumber: string;
      description: string;
      extension: string;
      type: string;
    }[];
  };
  entranceFees: { cost: string; description: string; title: string }[];
  entrancePasses: { cost: string; description: string; title: string }[];
  fees: [];
  directionsInfo: string;
  directionsUrl: string;
  operatingHours: {
    exceptions: [];
    description: string;
    standardHours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    name: string;
  }[];
  addresses: {
    postalCode: string;
    city: string;
    stateCode: string;
    countryCode: string;
    provinceTerritoryCode: string;
    line1: string;
    type: string;
    line2: string;
    line3: string;
  }[];
  images: {
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
  }[];
  weatherInfo: string;
  name: string;
  designation: string;
  relevanceScore: number;
}

// Is it possible to set type as multiple of a certain number?
//export type TParkDisplayLimit = 18 | 36 | 54 | 60;

export type TMainContentContext = {
  errorCode: string;
  allNationalParks: TPark[];
  displayedParks: TPark[];
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  successfulInitFetch: boolean;
  setSuccessfulInitFetch: Dispatch<SetStateAction<boolean>>;
  stateOrTerritoryFilter: string;
  setStateOrTerritoryFilter: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleStateFilter: (value: string) => void;
  handleSearchQuery: (value: string) => void;
  allNPAlerts: TParkAlert[];
  alertsAreLoading: boolean;
};

export type TStateAbbreviations = keyof typeof stateFilterOptions;

export interface TParkAlert {
  category: string;
  description: string;
  id: string;
  parkCode: string;
  title: string;
  url: string;
  lastIndexedDate: string;
  relatedRoadEvents:
    | {
        title: string;
        id: string;
        type: string;
        url: string;
      }[]
    | [];
}
