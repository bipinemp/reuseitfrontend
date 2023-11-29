"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Location } from "./Location";
import Search from "./Search";
import Chat from "./Chat";
import Notification from "./Notification";
import Sell from "./Sell";
import Link from "next/link";
import { PiArrowLeftBold } from "react-icons/pi";
import Sidebar from "./Sidebar";
import { nonavbarlist } from "@/lib/lists";
import { UserDropDown } from "./UserDropDown";

const mainNavbar = (
  <div className=" max-w-[1920px] mx-auto 2xl:px-72 flex gap-5 justify-between items-center px-4 lg:px-10">
    <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-5 items-start">
      <div className="w-full lg:w-[280px] flex justify-between items-center ">
        <Link href={"/"}>
          <h3 className="font-black">ReUseIt</h3>
        </Link>
        <div className="flex gap-2 items-center">
          <Location />
          <Sidebar />
        </div>
      </div>
      <div className="w-full items-center flex gap-3 justify-between">
        <Search />
        <div className="hidden lg:flex gap-2 items-center">
          <UserDropDown />
          <Chat />
          <Notification />
          <Sell />
        </div>
      </div>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const pathname = usePathname();

  if(pathname === "/dashboard"){
    return null
  }

  return (
    <div className="sticky top-0 left-0 z-50 py-4 mb-5 bg-zinc-200">
      {nonavbarlist.includes(pathname) ? (
        <div className="font-bold text-xl px-10">
          <Link
            href={"/"}
            className="flex w-fit items-center gap-2 transition hover:bg-neutral-300 p-2 rounded-lg"
          >
            <PiArrowLeftBold size={25} />
            Home
          </Link>
        </div>
      ) : (
        mainNavbar
      )}
    </div>
  );
};

export default Navbar;
