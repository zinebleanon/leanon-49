// This file contains all the marketplace data constants
export const marketplaceCategories = [
  "Baby Clothes", "Toys", "Strollers", "Car Seats", "Feeding", 
  "Books", "Home", "Maternity", "Furniture", "Others"
];

// Define subcategories for each main category
export const subCategories: Record<string, string[]> = {
  "Baby Clothes": ["Newborn (0-3m)", "Infant (3-12m)", "Toddler (1-3y)", "Kids (3-8y)"],
  "Toys": ["Educational", "Outdoor", "Plush", "Building", "Puzzles"],
  "Strollers": ["Travel Systems", "Joggers", "Double Strollers", "Lightweight"],
  "Car Seats": ["Infant", "Convertible", "Booster", "All-in-One"],
  "Feeding": ["Bottles", "High Chairs", "Breast Pumps", "Baby Food Makers", "Utensils"],
  "Books": ["Board Books", "Picture Books", "Educational", "Activity Books"],
  "Home": ["Nursery Decor", "Bedding", "Bath", "Safety", "Air Purifiers"],
  "Maternity": ["Clothing", "Nursing", "Pregnancy Care", "Postpartum"],
  "Furniture": ["Cribs", "Bassinets", "Changing Tables", "Gliders", "Storage"],
  "Others": ["Diapering", "Health & Safety", "Carriers", "Travel Accessories"]
};

// Age groups and sizes
export const ageGroups = [
  "Newborn", "0-3 months", "3-6 months", "6-12 months", 
  "1-2 years", "2-3 years", "3-4 years", "4-5 years",
  "5-6 years", "6-8 years", "8-10 years", "10+ years"
];

export const sizes = [
  "Preemie", "Newborn", "0-3M", "3-6M", "6-9M", "9-12M",
  "12-18M", "18-24M", "2T", "3T", "4T", "5T",
  "XS", "S", "M", "L", "XL", "One Size"
];

export const conditions = [
  "New with Tags", "Like New", "Good", "Well Used", "Needs Repair"
];

export const popularBrands = [
  "Chicco", "Avent", "Graco", "Fisher-Price", "Pampers", 
  "Huggies", "Britax", "Medela", "Baby Einstein", "Munchkin",
  "Uppababy", "Bugaboo", "Other"
];

// Add comprehensive list of Dubai neighborhoods
export const dubaiNeighborhoods = [
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
  "Arabian Ranches 2",
  "Barsha Heights (TECOM)",
  "Business Bay",
  "City Walk",
  "Culture Village",
  "DAMAC Hills",
  "DAMAC Hills 2",
  "Discovery Gardens",
  "Downtown Dubai",
  "Dubai Creek Harbour",
  "Dubai Design District",
  "Dubai Festival City",
  "Dubai Hills Estate",
  "Dubai Industrial City",
  "Dubai International City",
  "Dubai Investment Park",
  "Dubai Jumeirah Lakes Towers (JLT)",
  "Dubai Land",
  "Dubai Marina",
  "Dubai Media City",
  "Dubai Production City",
  "Dubai Silicon Oasis",
  "Dubai South",
  "Dubai Sports City",
  "Emirates Hills",
  "Green Community",
  "Healthcare City",
  "Internet City",
  "Jumeirah",
  "Jumeirah Beach Residence (JBR)",
  "Jumeirah Golf Estates",
  "Jumeirah Heights",
  "Jumeirah Islands",
  "Jumeirah Park",
  "Jumeirah Village Circle (JVC)",
  "Jumeirah Village Triangle (JVT)",
  "Knowledge Village",
  "Meadows",
  "Meydan",
  "Mirdif",
  "Motor City",
  "Mudon",
  "Nad Al Sheba",
  "Old Town",
  "Palm Jumeirah",
  "Remraam",
  "Springs",
  "Studio City",
  "Sustainable City",
  "The Gardens",
  "The Greens",
  "The Lakes",
  "The Views",
  "Town Square",
  "Umm Suqeim",
  "Victory Heights",
  "Warsan",
  "World Trade Centre"
].sort();

// Sample marketplace items
export const allMarketplaceItems = [
  {
    title: "Cybex Stroller (Like New)",
    seller: "Emma's Shop in Dubai Marina",
    price: "900 AED",
    condition: "Barely Used",
    image: "walker",
    brand: "Cybex",
    priceValue: 900,
    superMom: true,
    ageGroup: "0-3 years",
    category: "Strollers",
    size: "One Size"
  },
  {
    title: "Plan Toys Wooden Set",
    seller: "Natural Kids Al Ain",
    price: "149 AED",
    condition: "New",
    image: "toys",
    brand: "Plan Toys",
    priceValue: 149,
    superMom: false,
    ageGroup: "1-2 years",
    category: "Toys",
    size: "One Size"
  },
  {
    title: "Baby Clothes Bundle (0-3m)",
    seller: "Second Life Sharjah",
    price: "120 AED",
    condition: "Good",
    image: "clothes",
    brand: "Carter's",
    priceValue: 120,
    superMom: true,
    ageGroup: "0-3 months",
    category: "Baby Clothes",
    size: "0-3M"
  },
  {
    title: "Avent Baby Bottles (Set of 4)",
    seller: "Mom's Corner Abu Dhabi",
    price: "85 AED",
    condition: "Like New",
    image: "walker",
    brand: "Avent",
    priceValue: 85,
    superMom: false,
    ageGroup: "0-12 months",
    category: "Feeding",
    size: "One Size"
  },
  {
    title: "Graco Car Seat",
    seller: "Baby World Dubai",
    price: "350 AED",
    condition: "Good",
    image: "clothes",
    brand: "Graco",
    priceValue: 350,
    superMom: true,
    ageGroup: "0-12 months",
    category: "Car Seats",
    size: "One Size"
  },
  {
    title: "Fisher-Price Play Gym",
    seller: "Kids Corner Sharjah",
    price: "120 AED",
    condition: "Like New",
    image: "toys",
    brand: "Fisher-Price",
    priceValue: 120,
    superMom: false,
    ageGroup: "0-6 months",
    category: "Toys",
    size: "One Size"
  },
  {
    title: "Baby Clothes Bundle (6-9m)",
    seller: "Mom2Mom Dubai",
    price: "Free",
    condition: "Good",
    image: "clothes",
    brand: "Mixed",
    priceValue: 0,
    superMom: true,
    ageGroup: "6-9 months",
    category: "Baby Clothes",
    size: "6-9M"
  },
  {
    title: "Baby Bath Tub",
    seller: "Baby Essentials Abu Dhabi",
    price: "Contact Seller",
    condition: "Good",
    image: "toys",
    brand: "Summer Infant",
    priceValue: null,
    superMom: false,
    ageGroup: "0-12 months",
    category: "Home",
    size: "One Size"
  }
];

export type MarketplaceItem = typeof allMarketplaceItems[0];
