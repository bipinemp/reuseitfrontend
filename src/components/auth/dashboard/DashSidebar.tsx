"use client";

import { dashboard_links } from "@/lib/lists";
import React from "react";
import DashboardItem from "./DashboardItem";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";

const DashSidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col w-[280px] gap-5 bg-zinc-100 h-screen pt-7 pl-4 pr-4">
      <h2 className="flex items-center gap-2 justify-center font-bold tracking-wide bg-primary text-white py-2 rounded-lg text-center">
        <ShoppingBasket className="w-7 h-7" />
        ReUseIt
      </h2>
      <div className="pl-4 bg-primary/20 py-3 rounded-lg flex gap-2">
        <Image
          src="https://github.com/shadcn.png"
          width={40}
          height={50}
          alt=""
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">Bipin Bhandari</p>
          <span className="text-xs text-gray-700">bhandari@gmail.com</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {dashboard_links.map((val, i) => (
          <DashboardItem
            i={i}
            icon={val.icon}
            length={dashboard_links.length}
            link={val.link}
            key={i}
            name={val.name}
          />
        ))}
      </div>
    </div>
  );
};

export default DashSidebar;
