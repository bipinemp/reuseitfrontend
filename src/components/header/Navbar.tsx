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
  <div className=" mx-auto flex max-w-[1920px] items-center justify-between gap-5 px-4 lg:px-10 2xl:px-72">
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-5">
      <div className="flex w-full items-center justify-between lg:w-[280px]">
        <Link href={"/"} className="text-2xl font-bold">
          ReUseIt
        </Link>

        <div className="flex items-center gap-2">
          {/* <Location /> */}
          <Sidebar />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-3">
        <Search />
        <div className="hidden items-center gap-2 lg:flex">
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

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="sticky left-0 top-0 z-50 mb-5 bg-zinc-200 py-4">
      {nonavbarlist.includes(pathname) ||
      pathname.startsWith("/user") ||
      pathname.startsWith("/post") ? (
        <div className="px-10 text-xl font-bold">
          <Link
            href={"/"}
            className="flex w-fit items-center gap-2 rounded-lg p-2 transition hover:bg-neutral-300"
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
