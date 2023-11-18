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
  { name: "Furniture", icon: LuSofa, link: "furniture" },
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

export const nonavbarlist = ["/post", "/post/home_appliances"];

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

// export const category_list: CategoryList[] = [
//   {
//     name: "Cars",
//     subcategories: ["Cars"],
//   },
//   {
//     name: "Properties",
//     subcategories: [
//       "For Sale: Houses & Apartments",
//       "For Rent: Houses & Apartments",
//       "Lands & Plots",
//       "For Rent: Shops & Offices",
//       "For Sale: Shops & Offices",
//       "PG & Guest Houses",
//     ],
//   },
//   {
//     name: "Mobiles",
//     subcategories: ["Mobile Phones", "Accessories", "Tablets"],
//   },
//   {
//     name: "Jobs",
//     subcategories: [
//       "Data entry & Back office",
//       "Sales & Marketing",
//       "BPO & Telecaller",
//       "Driver",
//       "Office Assistent",
//       "Delivery & Collection",
//       "Teacher",
//       "Cook",
//       "Receptionist & Front office",
//       "Operator & Technician",
//       "IT Engineer & Developer",
//       "Hotel & Travel Executive",
//       "Accountant",
//       "Designer",
//       "Other Jobs",
//     ],
//   },
//   {
//     name: "Bikes",
//     subcategories: ["Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
//   },
//   {
//     name: "Electronics & Appliances",
//     subcategories: [
//       "TVs, Video - Audio",
//       "Kitchen & Other Appliances",
//       "Computers & Laptops",
//       "Cameras & Lenses",
//       "Games & Entertainment",
//       "Fridges",
//       "Computer Accessories",
//       "Hard Disks, Printers & Monitors",
//       "ACs",
//       "Washing Machines",
//     ],
//   },
//   {
//     name: "Commercial Vehicles & Spares",
//     subcategories: ["Commercial & Other Vehicles", "Spare Parts"],
//   },
//   {
//     name: "Furniture",
//     subcategories: [
//       "Sofa & Dining",
//       "Beds & Wardrobes",
//       "Home Decor & Garden",
//       "Kids Furniture",
//       "Other Household Items",
//     ],
//   },
//   {
//     name: "Fashion",
//     subcategories: ["Men", "Women", "Kids"],
//   },
//   {
//     name: "Books, Sports & Hobbies",
//     subcategories: [
//       "Books",
//       "Gym & Fitness",
//       "Musical Instruments",
//       "Sports Equipment",
//       "Other Hobbies",
//     ],
//   },
// ];
