import { MdMonitor, MdOutlineToys } from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";
import { LuSofa } from "react-icons/lu";
import { IoShirtOutline } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import { LiaBookSolid, LiaCarSideSolid } from "react-icons/lia";
import { GiPorcelainVase } from "react-icons/gi";
import { PiGuitarBold } from "react-icons/pi";
import { BarChart } from "lucide-react";
import { Users } from "lucide-react";
import { User } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Settings } from "lucide-react";

export const dashboard_links = [
  {
    name: "Overview",
    icon: BarChart,
    link: "/",
  },
  {
    name: "Customers",
    icon: Users,
    link: "/customers",
  },
  {
    name: "Account",
    icon: User,
    link: "/account",
  },
  {
    name: "Products",
    icon: ListChecks,
    link: "/products",
  },
  {
    name: "Settings",
    icon: Settings,
    link: "/settings",
  },
];

export const category_list = [
  {
    name: "Electronics",
    icon: MdMonitor,
    link: "electronics",
  },
  {
    name: "Home Appliances",
    icon: RiHomeOfficeLine,
    link: "home_appliances",
  },
  { name: "Furniture", icon: LuSofa, link: "furnitures" },
  {
    name: "Clothing and Accessories",
    icon: IoShirtOutline,
    link: "clothing_accessories",
  },
  {
    name: "Toys and Games",
    icon: MdOutlineToys,
    link: "toys_games",
  },
  {
    name: "Sports and Fitness",
    icon: CgGym,
    link: "sports_fitness",
  },
  {
    name: "Books and Media",
    icon: LiaBookSolid,
    link: "books_media",
  },
  {
    name: "Antiques and Collectibles",
    icon: GiPorcelainVase,
    link: "antiques_collectibles",
  },
  { name: "Vehicles", icon: LiaCarSideSolid, link: "vehicles" },
  {
    name: "Musical Instruments",
    icon: PiGuitarBold,
    link: "musical_instruments",
  },
];

export const categoryfilter_list = [
  {
    name: "Electronics",
    icon: MdMonitor,
    link: "electronics",
  },
  {
    name: "Home Appliances",
    icon: RiHomeOfficeLine,
    link: "home_appliances",
  },
  { name: "Furniture", icon: LuSofa, link: "furnitures" },
  {
    name: "Clothing and Accessories",
    icon: IoShirtOutline,
    link: "clothing_accessories",
  },
  {
    name: "Toys and Games",
    icon: MdOutlineToys,
    link: "toys_games",
  },
  {
    name: "Sports and Fitness",
    icon: CgGym,
    link: "sports_fitness",
  },
  {
    name: "Books and Media",
    icon: LiaBookSolid,
    link: "books_media",
  },
  {
    name: "Antiques and Collectibles",
    icon: GiPorcelainVase,
    link: "antiques_collectibles",
  },
  { name: "Cars", icon: LiaCarSideSolid, link: "vehicles" },
  { name: "Bicycles", icon: LiaCarSideSolid, link: "vehicles" },
  { name: "Motorcycles", icon: LiaCarSideSolid, link: "vehicles" },
  { name: "Scooters", icon: LiaCarSideSolid, link: "vehicles" },
  {
    name: "Musical Instruments",
    icon: PiGuitarBold,
    link: "musical_instruments",
  },
];

export const nonavbarlist = [
  "/post",
  "/post/home_appliances",
  "/post/electronics",
  "/post/furnitures",
  "/post/clothing_accessories",
  "/post/toys_games",
  "/post/sports_fitness",
  "/post/books_media",
  "/post/vehicles",
  "/post/musical_instruments",
  "/post/antiques_collectibles",
  "/login",
  "/register",
  "/user",
  "/formbuilder",
  "/chart",
  "/business_packages",
  "/success",
];

export const BusinessPackages = [
  { id: 1, name: "1 Ad", selected: false, price: "NPR 100", amount: 100 },
  { id: 2, name: "2 Ad", selected: false, price: "NPR 200", amount: 200 },
  { id: 3, name: "3 Ad", selected: false, price: "NPR 300", amount: 300 },
  { id: 4, name: "4 Ad", selected: false, price: "NPR 400", amount: 400 },
];

export const homeapplianceslist = [
  {
    name: "type",
    list: [
      "Refrigerator",
      "Washing Machine",
      "Dishwasher",
      "Microwave Oven",
      "Air Conditioner",
      "Blender",
      "Others",
    ],
  },
  {
    name: "brand",
    list: ["Samsung", "LG", "Whirlpool", "Bosch", "Panasonic", "KitchenAid"],
  },
  {
    name: "warrenty",
    list: [
      "1-year manufacturer's warranty",
      "Extended warranty available",
      "No warranty (sold as-is)",
      "Home warranty included",
      "Limited lifetime warranty on certain parts",
    ],
  },
  {
    name: "condition",
    list: [
      "Brand New (never used)",
      "Like New (gently used with minimal signs of wear)",
      "Good (used with some signs of wear but functions well)",
      "Fair (visible wear and tear but still functional)",
      "Poor (may require repairs or refurbishment)",
    ],
  },
];

export const electronicsList = [
  {
    name: "type",
    list: [
      "Laptop",
      "Desktop Computer",
      "Smartphone",
      "Tablet",
      "Digital Camera",
      "Headphones",
      "Smartwatch",
      "Gaming Console",
      "Printer",
      "Television",
      "Others",
    ],
  },
  {
    name: "warrenty",
    list: [
      "1-year manufacturer's warranty",
      "Extended warranty available",
      "No warranty (sold as-is)",
      "Limited lifetime warranty on certain parts",
    ],
  },
  {
    name: "condition",
    list: [
      "Brand New (never used)",
      "Good (used with some signs of wear but functions well)",
      "Like New (gently used with minimal signs of wear)",
      "Fair (visible wear and tear but still functional)",
      "Poor (may require repairs or refurbishment)",
    ],
  },
];

export const furnitureList = [
  {
    name: "type",
    list: [
      "Chair",
      "Table",
      "Sofa",
      "Bed",
      "Cabinet",
      "Shelf",
      "Desk",
      "Dresser",
      "Wardrobe",
      "Others",
    ],
  },
  {
    name: "material",
    list: [
      "Wood",
      "Metal",
      "Plastic",
      "Glass",
      "Leather",
      "Fabric",
      "Rattan",
      "Wicker",
      "Concrete",
      "Others",
    ],
  },
  {
    name: "color",
    list: [
      "White",
      "Black",
      "Brown",
      "Gray",
      "Blue",
      "Red",
      "Green",
      "Yellow",
      "Purple",
      "Others",
    ],
  },
  {
    name: "style",
    list: [
      "Modern",
      "Traditional",
      "Contemporary",
      "Vintage",
      "Rustic",
      "Industrial",
      "Bohemian",
      "Scandinavian",
      "Mid-Century Modern",
      "Others",
    ],
  },
  {
    name: "condition",
    list: ["Brand New", "Like New", "Good", "Fair", "Poor"],
  },
];

export const clothingAccessoryList = [
  {
    name: "type",
    list: [
      "Hat",
      "Scarf",
      "Gloves",
      "Socks",
      "Tie",
      "Belt",
      "Handbag",
      "Backpack",
      "Jewelry",
      "Jackets",
      "Others",
    ],
  },
  {
    name: "size",
    list: ["XS", "S", "M", "L", "XL", "XXL", "One Size", "Custom", "Others"],
  },
  {
    name: "color",
    list: [
      "White",
      "Black",
      "Brown",
      "Gray",
      "Blue",
      "Red",
      "Green",
      "Yellow",
      "Purple",
      "Others",
    ],
  },
  {
    name: "brand",
    list: [
      "Nike",
      "Adidas",
      "Gucci",
      "Zara",
      "H&M",
      "Calvin Klein",
      "Puma",
      "Levi's",
      "Chanel",
      "Others",
    ],
  },
  {
    name: "material",
    list: [
      "Cotton",
      "Wool",
      "Leather",
      "Silk",
      "Polyester",
      "Denim",
      "Linen",
      "Knit",
      "Synthetic",
      "Others",
    ],
  },
  {
    name: "condition",
    list: ["Brand New", "Like New", "Good", "Fair", "Poor"],
  },
  {
    name: "care_instructions",
    list: [
      "Machine wash cold",
      "Hand wash only",
      "Dry clean recommended",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat",
      "No special care required",
      "Others",
    ],
  },
];

export const toyGameList = [
  {
    name: "type",
    list: [
      "Board Game",
      "Puzzle",
      "Action Figure",
      "Doll",
      "Building Blocks",
      "Educational Toy",
      "Electronic Toy",
      "Outdoor Toy",
      "Remote Control Toy",
      "Others",
    ],
  },
  {
    name: "age_group",
    list: [
      "0-2 years",
      "3-5 years",
      "6-8 years",
      "9-12 years",
      "13-18 years",
      "Adults",
    ],
  },
  {
    name: "brand",
    list: [
      "LEGO",
      "Hasbro",
      "Mattel",
      "Fisher-Price",
      "Nintendo",
      "PlayStation",
      "Xbox",
      "Melissa & Doug",
      "VTech",
      "Others",
    ],
  },
  {
    name: "condition",
    list: ["Brand New", "Like New", "Good", "Fair", "Poor"],
  },
  {
    name: "safety_information",
    list: [
      "Meets safety standards",
      "Choking hazard, not suitable for children under 3 years",
      "Contains small parts",
      "No safety information available",
    ],
  },

  {
    name: "recommended_use",
    list: [
      "Indoor play",
      "Outdoor play",
      "Educational purposes",
      "Entertainment",
      "Collectible",
      "Others",
    ],
  },
];

export const sportsFitnessList = [
  {
    name: "type",
    list: [
      "Treadmill",
      "Elliptical Trainer",
      "Exercise Bike",
      "Dumbbells",
      "Yoga Mat",
      "Resistance Bands",
      "Jump Rope",
      "Fitness Ball",
      "Boxing Gloves",
      "Others",
    ],
  },
  {
    name: "brand",
    list: ["Nike", "Adidas", "Reebok", "Under Armour", "Puma", "Bowflex"],
  },
  {
    name: "condition",
    list: ["Brand New", "Like New", "Good", "Fair", "Poor"],
  },

  {
    name: "suitable_sport_activity",
    list: [
      "Running",
      "Cycling",
      "Strength Training",
      "Yoga",
      "Boxing",
      "Cardio",
      "Pilates",
      "CrossFit",
      "Martial Arts",
      "Others",
    ],
  },
  {
    name: "warranty_information",
    list: [
      "1-year manufacturer's warranty",
      "Extended warranty available",
      "No warranty (sold as-is)",
      "Limited lifetime warranty on certain parts",
    ],
  },
  {
    name: "usage_instructions",
    list: [
      "Read the user manual before use",
      "Consult with a fitness professional",
      "Follow safety guidelines",
      "Use in well-ventilated area",
      "Store in a dry place",
      "Clean after each use",
      "No special instructions",
      "Others",
    ],
  },
];

export const booksMediaList = [
  {
    name: "genre",
    list: [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Mystery",
      "Romance",
      "Fantasy",
      "Biography",
      "History",
      "Self-Help",
      "Others",
    ],
  },
  {
    name: "format",
    list: [
      "Hardcover",
      "Paperback",
      "E-book",
      "Audiobook",
      "Magazine",
      "Comic Book",
      "Graphic Novel",
      "DVD",
      "Blu-ray",
      "Others",
    ],
  },
  {
    name: "condition",
    list: [
      "Brand New (never used)",
      "Like New (gently used with minimal signs of wear)",
      "Good (used with some signs of wear but functions well)",
      "Fair (visible wear and tear but still functional)",
      "Poor (may require repairs or refurbishment)",
    ],
  },
  {
    name: "edition",
    list: [
      "First Edition",
      "Limited Edition",
      "Collector's Edition",
      "Revised Edition",
      "Digital Edition",
      "International Edition",
      "Special Edition",
      "Unabridged",
      "Abridged",
      "Others",
    ],
  },
];

export const antiquesCollectiblesList = [
  {
    name: "type",
    list: [
      "Furniture",
      "Artwork",
      "Jewelry",
      "Ceramics",
      "Coins",
      "Books",
      "Toys",
      "Collectible Cards",
      "Timepieces",
      "Others",
    ],
  },
  {
    name: "era_period",
    list: [
      "Ancient",
      "Medieval",
      "Renaissance",
      "Baroque",
      "Victorian",
      "Art Nouveau",
      "Art Deco",
      "Mid-Century Modern",
      "Contemporary",
      "Others",
    ],
  },
  {
    name: "material",
    list: [
      "Wood",
      "Metal",
      "Glass",
      "Porcelain",
      "Silver",
      "Bronze",
      "Marble",
      "Ivory",
      "Paper",
      "Others",
    ],
  },
  {
    name: "condition",
    list: ["Mint Condition", "Excellent", "Good", "Fair", "Poor"],
  },
  {
    name: "provenance_location",
    list: [
      "Europe",
      "Asia",
      "North America",
      "South America",
      "Africa",
      "Australia",
      "Antarctica",
      "Unknown",
      "Others",
    ],
  },
  {
    name: "rarity",
    list: ["Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare"],
  },
  {
    name: "historical_significance",
    list: [
      "Significant Historical Figure",
      "Cultural Artifact",
      "Archaeological Find",
      "Important Event",
      "Famous Artwork",
      "Unique Origin",
      "No Historical Significance",
      "Others",
    ],
  },
];

export const musicalInstrumentsList = [
  {
    name: "type",
    list: [
      "Guitar",
      "Piano",
      "Violin",
      "Trumpet",
      "Drums",
      "Flute",
      "Saxophone",
      "Clarinet",
      "Cello",
      "Others",
    ],
  },
  {
    name: "brand",
    list: [
      "Fender",
      "Yamaha",
      "Gibson",
      "Steinway & Sons",
      "Stradivarius",
      "Roland",
      "Selmer",
      "Buffet Crampon",
      "Ibanez",
      "Others",
    ],
  },
  {
    name: "condition",
    list: [
      "Brand New (never used)",
      "Like New (gently used with minimal signs of wear)",
      "Good (used with some signs of wear but functions well)",
      "Fair (visible wear and tear but still functional)",
      "Poor (may require repairs or refurbishment)",
    ],
  },
  {
    name: "material",
    list: [
      "Wood",
      "Brass",
      "Steel",
      "Plastic",
      "Composite",
      "Aluminum",
      "Carbon Fiber",
      "Maple",
      "Mahogany",
      "Others",
    ],
  },
  {
    name: "accessories_included",
    list: [
      "Case",
      "Stand",
      "Bow",
      "Mouthpiece",
      "Straps",
      "Reeds",
      "Picks",
      "Tuner",
      "Cleaning Kit",
      "Others",
    ],
  },
  {
    name: "sound_characteristics",
    list: [
      "Bright",
      "Warm",
      "Rich",
      "Crisp",
      "Mellow",
      "Resonant",
      "Sharp",
      "Smooth",
      "Punchy",
      "Others",
    ],
  },
];
