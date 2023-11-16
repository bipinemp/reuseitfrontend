import React from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Location: React.FC = () => {
  const popularLocations = ["Gaindakot", "Chitwan", "Butwal"];

  return (
    <div className="relative flex items-center">
      <span className="absolute left-2">
        <IoSearch size={25} color="gray" />
      </span>
      <Input
        type="text"
        placeholder="Search city, area or Locality"
        className="w-[350px] pl-9 border-gray-400 py-6"
      />
      <span className="absolute right-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-end">
            <IoIosArrowDown size={25} color="gray" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[350px] -ml-[19.2rem] mt-[3px]">
            <DropdownMenuLabel className="flex items-center gap-3 cursor-pointer py-3">
              <FaLocationCrosshairs size={25} color="#2562EA" />
              <h3 className="text-primary hover:underline transition">
                Use Current Location
              </h3>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <h3 className="px-2.5 py-2 font-medium text-content">
              Recent Location
            </h3>
            <DropdownMenuItem className="items-start">
              <p className="flex items-center gap-2">
                <FaLocationDot size={20} color="gray" />
                Nepal
              </p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <h3 className="px-2.5 py-2 font-medium text-content">
              Popular Locations
            </h3>
            {popularLocations.map((location, i) => (
              <DropdownMenuItem key={i}>
                <p className="flex items-center gap-2">
                  <FaLocationDot size={20} color="gray" />
                  {location}
                </p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </div>
  );
};

export default Location;
