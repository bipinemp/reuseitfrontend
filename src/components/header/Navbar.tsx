"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Location from "./Location";
import Search from "./Search";
import Chat from "./Chat";
import Notification from "./Notification";
import Sell from "./Sell";
import Profile from "./Profile";

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
        <h2 className="text-center font-bold">{"< "}Home</h2>
      ) : (
        mainNavbar
      )}
    </div>
  );
};

export default Navbar;
