/* A separate object for state & territory filter options exists b/c these are counted separately in other 
component(s) */
export const stateFilterOptions = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "FL": "Florida",
  "GA": "Georgia",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PA": "Pennsylvania",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming",
};

export const territoryFilterOptions = {
  "AS": "American Samoa",
  "GU": "Guam",
  "MP": "Northern Mariana Islands",
  "PR": "Puerto Rico",
  "VI": "Virgin Islands",
};

export const quizQuestions = [
  {
    question:
      "Which national park is the same size as Yosemite, Yellowstone, & Switzerland combined?",
    answers: {
      rightAnswer: "Wrangell-St.Elias",
      wrongAnswerOne: "Katmai",
      wrongAnswerTwo: "Zion",
      wrongAnswerThree: "Acadia",
    },
  },
  {
    question: "Which national park is the smallest?",
    answers: {
      rightAnswer: "Gateway Arch",
      wrongAnswerOne: "Isle Royale",
      wrongAnswerTwo: "Denali",
      wrongAnswerThree: "Shenandoah",
    },
  },
  {
    question: "Which President established Denali N.P. & Theodore Roosevelt N.P.?",
    answers: {
      rightAnswer: "Jimmy Carter",
      wrongAnswerOne: "Theodore Roosevelt",
      wrongAnswerTwo: "Franklin Roosevelt",
      wrongAnswerThree: "Dwight Eisenhower",
    },
  },
  {
    question: "Which national park is home to the highest peak in North America?",
    answers: {
      rightAnswer: "Denali",
      wrongAnswerOne: "Yosemite",
      wrongAnswerTwo: "Rocky Mountain",
      wrongAnswerThree: "Badlands",
    },
    comment:
      "Denali N.P. is home to Mt. McKinley, which is the highest peak in North America at 20,310 ft (6,190 m)",
  },
  {
    question: "Which national park is home to the deepest lake in the U.S.?",
    answers: {
      rightAnswer: "Crater Lake",
      wrongAnswerOne: "Isle Royale",
      wrongAnswerTwo: "Everglades",
      wrongAnswerThree: "Death Valley",
    },
    comment: "Crater Lake reaches a depth of 1,943 ft (592m m).",
  },
  {
    question: "Which national park is home to the largest cacti in the U.S.?",
    answers: {
      rightAnswer: "Saguaro",
      wrongAnswerOne: "Death Valley",
      wrongAnswerTwo: "Joshua Tree",
      wrongAnswerThree: "Guadalupe Mountains",
    },
    comment:
      "Saguaro cacti can live up to 200 years & the tallest one ever recorded was 78 ft (24 m) tall.",
  },
  {
    question:
      "Which national park is home to the largest single-stem tree by volume in the world?",
    answers: {
      rightAnswer: "Redwood",
      wrongAnswerOne: "Joshua Tree",
      wrongAnswerTwo: "Haleakalā",
      wrongAnswerThree: "Cuyahoga Valley",
    },
    comment: "This tree started growing more than 2,000 years ago.",
  },
  {
    question: "What was the first national park?",
    answers: {
      rightAnswer: "Yellowstone",
      wrongAnswerOne: "Yosemite",
      wrongAnswerTwo: "Theodore Roosevelt",
      wrongAnswerThree: "Zion",
    },
  },
  {
    question:
      "In which national park was the hottest-ever temperature on Earth recorded?",
    answers: {
      rightAnswer: "Death Valley",
      wrongAnswerOne: "Big Bend",
      wrongAnswerTwo: "White Sands",
      wrongAnswerThree: "Grand Canyon",
    },
    comment:
      "A temperature of 201° F (94° C) was recorded in Death Valley at Furnace Creek in 1972.",
  },
  {
    question: "Which state is Mesa Verde N.P. in?",
    answers: {
      rightAnswer: "Colorado",
      wrongAnswerOne: "New Mexico",
      wrongAnswerTwo: "California",
      wrongAnswerThree: "Arizona",
    },
  },
  {
    question:
      "Which President worked as a park ranger in the summer of 1936 at 23 years old?",
    answers: {
      rightAnswer: "Gerald Ford",
      wrongAnswerOne: "Theodore Roosevelt",
      wrongAnswerTwo: "Joe Biden",
      wrongAnswerThree: "Donald Trump",
    },
    comment: "Gerald Ford spend the summer of 1936 working in Yellowstone N.P.",
  },
  {
    question: "Which national park is the most visited (in terms of visitors per year)?",
    answers: {
      rightAnswer: "Great Smoky Mountains",
      wrongAnswerOne: "Yosemite",
      wrongAnswerTwo: "Olympic",
      wrongAnswerThree: "Grand Canyon",
    },
    comment: "Around 13M visitors come to Great Smoky Mountains N.P. annually.",
  },
  {
    question: "Which state has the most national parks?",
    answers: {
      rightAnswer: "California",
      wrongAnswerOne: "Alaska",
      wrongAnswerTwo: "Utah",
      wrongAnswerThree: "Colorado",
    },
    comment: "California has 9, Alaska has 8, Utah has 5, & Colorado has 4.",
  },
  {
    question: "Which national park is roughly the size of Wales?",
    answers: {
      rightAnswer: "Katmai",
      wrongAnswerOne: "Denali",
      wrongAnswerTwo: "Glacier",
      wrongAnswerThree: "Kenai Fjords",
    },
    comment: "California has 9, Alaska has 8, Utah has 5, & Colorado has 4.",
  },
  {
    question: "Which of these national parks is not accessible by car?",
    answers: {
      rightAnswer: "Katmai",
      wrongAnswerOne: "Gates of the Arctic",
      wrongAnswerTwo: "Glacier Bay",
      wrongAnswerThree: "Kobuk Valley",
    },
    comment:
      "Due to its disconnection from the Alaskan road network, nearly all visitors to Katmai N.P. arrive by bush plane, landing on water & taxiing to the shore, or by boat.",
  },
  {
    question: "Which is the least-visited national park?",
    answers: {
      rightAnswer: "Kobuk Valley",
      wrongAnswerOne: "Wrangell-St. Elias",
      wrongAnswerTwo: "Lake Clark",
      wrongAnswerThree: "New River Gorge",
    },
    comment:
      "Because of its extremely remote location, Kobuk Valley attracts only around 3,000 guests every year.",
  },
  {
    question:
      "Which national park is home to the longest (mapped) cave system in the world?",
    answers: {
      rightAnswer: "Mammoth Cave",
      wrongAnswerOne: "Carlsbad Caverns",
      wrongAnswerTwo: "Wind Cave",
      wrongAnswerThree: "Black Canyon of the Gunnison",
    },
    comment:
      "Over 400 miles (644 km) have been mapped so far, though the NPS estimates there are around 600 more miles (966 km).",
  },
  {
    question: "Which national park is home to the tallest sand dunes in North America?",
    answers: {
      rightAnswer: "Great Sand Dunes",
      wrongAnswerOne: "Indiana Dunes",
      wrongAnswerTwo: "White Sands",
      wrongAnswerThree: "Dry Tortugas",
    },
  },
  {
    question: "True or False: Michigan has two national parks.",
    answers: {
      rightAnswer: "True",
      wrongAnswerOne: "False",
    },
  },
  {
    question: "Which of these national parks is located in Montana?",
    answers: {
      rightAnswer: "Glacier",
      wrongAnswerOne: "Glacier Bay",
    },
  },
  {
    question: "Which of these national parks is not located in the U.S.?",
    answers: {
      rightAnswer: "Banff",
      wrongAnswerOne: "Acadia",
      wrongAnswerTwo: "Isle Royale",
      wrongAnswerThree: "Voyageurs",
    },
    comment: "Banff National Park is located in the Canadian Rocky Mountains.",
  },
  {
    question:
      'Which of these national parks is nicknamed the "salamander capital of the world"?',
    answers: {
      rightAnswer: "Great Smoky Mountains",
      wrongAnswerOne: "Saguaro",
      wrongAnswerTwo: "Petrified Forest",
      wrongAnswerThree: "Everglades",
    },
  },
  {
    question:
      "Which of these national parks contains 3 of the world's tallest waterfalls?",
    answers: {
      rightAnswer: "Yosemite",
      wrongAnswerOne: "Rocky Mountains",
      wrongAnswerTwo: "Capitol Reef",
      wrongAnswerThree: "Kenai Fjords",
    },
    comment: "Ribbon Falls in Yosemite N.P. is 9x taller than Niagara Falls.",
  },
  {
    question: "Which state is Capitol Reef National Park in?",
    answers: {
      rightAnswer: "Utah",
      wrongAnswerOne: "Louisiana",
      wrongAnswerTwo: "Florida",
      wrongAnswerThree: "California",
    },
    comment:
      "Despite its name, this park is, indeed, in one of the driest states in the country, Utah.",
  },
  {
    question:
      "True or False: Grand Canyon N.P. is bigger than the state of Rhode Island.",
    answers: {
      rightAnswer: "True",
      wrongAnswerOne: "False",
    },
    comment:
      "Grand Canyon N.P. measures 1,904 sq mi (3,064 sq m), while Rhode Island measures only 1,212 sq ft (1,951 sq m).",
  },
  {
    question:
      "True or False: The second national park established doesn't exist anymore.",
    answers: {
      rightAnswer: "True",
      wrongAnswerOne: "False",
    },
    comment:
      "Established in 1875, Mackinac Island N.P. of Michigan was the 2nd N.P. established; since 1895, it has been a state park.",
  },
  {
    question:
      "All national parks are have free admission on the Fourth of July (Independence Day).",
    answers: {
      rightAnswer: "False",
      wrongAnswerOne: "True",
    },
    comment:
      "Visitors may enter national parks free-of-charge on the Birthday of Martin Luther King, Jr. (Jan 15), the First day of National Park Week (Apr 20), Juneteenth National Independence Day (Jun 19), the Anniversary of the Great American Outdoors Act (Aug 4), National Public Lands Day (Sep 28), and Veterans' Day (Nov 11).",
  },
  {
    question: "Some national parks are older than some U.S. states.",
    answers: {
      rightAnswer: "True",
      wrongAnswerOne: "False",
    },
  },
  {
    question: "There is actually a national park in Ohio.",
    answers: {
      rightAnswer: "True",
      wrongAnswerOne: "False",
    },
    comment:
      'Although the state is referred to as the "armpit of America" by some, it is home to Cuyahoga Valley National Park.',
  },
  {
    question: "True or False: All national parks are located in states.",
    answers: {
      rightAnswer: "False",
      wrongAnswerOne: "True",
    },
  },
];
