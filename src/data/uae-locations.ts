
interface EmirateNeighborhoods {
  [emirate: string]: string[];
}

export const emiratesNeighborhoods: EmirateNeighborhoods = {
  "Dubai": [
    "Al Barsha",
    "Al Furjan",
    "Al Karama",
    "Al Manara",
    "Al Nahda",
    "Al Quoz",
    "Al Qusais",
    "Al Rashidiya",
    "Al Satwa",
    "Al Safa",
    "Al Sufouh",
    "Al Wasl",
    "Arabian Ranches",
    "Barsha Heights (TECOM)",
    "Business Bay",
    "City Walk",
    "Culture Village",
    "DAMAC Hills",
    "Discovery Gardens",
    "Downtown Dubai",
    "Dubai Creek Harbour",
    "Dubai Design District",
    "Dubai Festival City",
    "Dubai Hills Estate",
    "Dubai International City",
    "Dubai Investment Park",
    "Dubai Marina",
    "Dubai Media City",
    "Dubai Silicon Oasis",
    "Dubai Sports City",
    "Emirates Hills",
    "Green Community",
    "Healthcare City",
    "Internet City",
    "Jumeirah",
    "Jumeirah Beach Residence (JBR)",
    "Jumeirah Golf Estates",
    "Jumeirah Islands",
    "Jumeirah Village Circle (JVC)",
    "Jumeirah Village Triangle (JVT)",
    "Knowledge Village",
    "Meydan",
    "Mirdif",
    "Motor City",
    "Mudon",
    "Palm Jumeirah",
    "Remraam",
    "Springs",
    "Studio City",
    "The Gardens",
    "The Greens",
    "The Lakes",
    "Town Square",
    "Umm Suqeim",
    "World Trade Centre"
  ],
  "Abu Dhabi": [
    "Al Bateen",
    "Al Khalidiyah",
    "Al Maryah Island",
    "Al Mushrif",
    "Al Raha Beach",
    "Al Rahba",
    "Al Reem Island",
    "Al Wahda",
    "Baniyas",
    "Corniche",
    "Khalifa City",
    "Madinat Zayed",
    "Mohammed Bin Zayed City",
    "Mussafah",
    "Saadiyat Island",
    "Yas Island"
  ],
  "Sharjah": [
    "Abu Shagara",
    "Al Khan",
    "Al Majaz",
    "Al Nahda",
    "Al Qasimia",
    "Al Taawun",
    "Bu Tina",
    "Muwaileh",
    "University City"
  ],
  "Ajman": [
    "Ajman Downtown",
    "Al Jurf",
    "Al Rashidiya",
    "Emirates City",
    "Garden City",
    "Marina"
  ],
  "Ras Al Khaimah": [
    "Al Dhait",
    "Al Hamra Village",
    "Al Marjan Island",
    "Al Nakheel",
    "Mina Al Arab"
  ],
  "Fujairah": [
    "Al Faseel",
    "City Centre",
    "Dibba",
    "Fujairah Beach",
    "Merashid"
  ],
  "Umm Al Quwain": [
    "Al Salamah",
    "Dreamland",
    "UAQ Marina",
    "Old Town"
  ]
};

export const getAllNeighborhoods = () => {
  const allNeighborhoods: string[] = [];
  Object.values(emiratesNeighborhoods).forEach(neighborhoods => {
    allNeighborhoods.push(...neighborhoods);
  });
  return allNeighborhoods.sort();
};

export const getEmirateFromNeighborhood = (neighborhood: string): string | null => {
  for (const [emirate, neighborhoods] of Object.entries(emiratesNeighborhoods)) {
    if (neighborhoods.includes(neighborhood)) {
      return emirate;
    }
  }
  return null;
};

