export interface TPark {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  activities: [{ id: string; name: string }];
  topics: [{ id: string; name: string }];
  states: string | string[];
  contacts: [
    emailAddresses: { description: string; emailAddress: string }[],
    phoneNumbers: {
      phoneNumber: string;
      description: string;
      extension: string;
      type: string;
    }[]
  ];
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
