"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Location from "./Location";
import Search from "./Search";
import Chat from "./Chat";
import Notification from "./Notification";
import Sell from "./Sell";
import Profile from "./Profile";
import Link from "next/link";
import { PiArrowLeftBold } from "react-icons/pi";

const mainNavbar = (
  <div className="flex gap-5 justify-between items-center px-10">
    <div className="flex gap-5 items-center">
      <h3 className="font-black">ReUseIt</h3>
      <Location />
      <Search />
    </div>
    <div className="flex items-center gap-2">
      <Profile />
      <Chat />
      <Notification />
      <Sell />
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 left-0 z-50 py-4 mb-5 bg-zinc-200">
      {pathname === "/post" ? (
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
