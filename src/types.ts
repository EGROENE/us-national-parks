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
  isError429: boolean;
  allNationalParks: TPark[];
  displayedParks: TPark[];
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  successfulInitFetch: boolean;
  stateOrTerritoryFilter: string;
  setStateOrTerritoryFilter: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleStateFilter: (value: string) => void;
  handleSearchQuery: (value: string) => void;
  allNPAlerts: TParkAlert[];
  alertsAreLoading: boolean;
};

export type TQuizContext = {
  totalQuestionsSelected: number | undefined;
  setTotalQuestionsSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentQuestions: TQuizQuestion[] | undefined;
  setCurrentQuestions: React.Dispatch<React.SetStateAction<TQuizQuestion[] | undefined>>;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  questionAnswered: boolean;
  setQuestionAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  randomizedAnswers: [string, string][] | undefined;
  setRandomizedAnswers: React.Dispatch<
    React.SetStateAction<[string, string][] | undefined>
  >;
  selectedAnswer: [string, string];
  setSelectedAnswer: React.Dispatch<React.SetStateAction<[string, string]>>;
  quizLength: number | undefined;
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

export interface TCurrentWeather {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: { text: string; icon: string; code: number };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

export interface TQuizQuestion {
  question: string;
  answers: {
    rightAnswer: string;
    wrongAnswerOne: string;
    wrongAnswerTwo?: string;
    wrongAnswerThree?: string;
  };
  comment?: string;
}
