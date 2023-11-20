import { MdMonitor, MdOutlineToys } from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";
import { LuSofa } from "react-icons/lu";
import { IoShirtOutline } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import { LiaBookSolid, LiaCarSideSolid } from "react-icons/lia";
import { GiPorcelainVase } from "react-icons/gi";
import { PiGuitarBold, PiDotsNine } from "react-icons/pi";

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
  { name: "Others", icon: PiDotsNine, link: "others" },
];

export const nonavbarlist = [
  "/post",
  "/post/home_appliances",
  "/post/electronics",
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
      "Like New (gently used with minimal signs of wear)",
      "Good (used with some signs of wear but functions well)",
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
