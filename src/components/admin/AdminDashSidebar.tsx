"use client";

import { admin_dash_links } from "@/lib/lists";
import React from "react";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import AdminDashItem from "../auth/dashboard/AdminDashItem";

const AdminDashSidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-[280px] flex-col gap-5 bg-zinc-100 pl-4 pr-4 pt-7">
      <Link href={"/"}>
        <h2 className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2 text-center font-bold tracking-wide text-white">
          <ShoppingBasket className="h-7 w-7" />
          ReUseIt
        </h2>
      </Link>
      <div className="flex gap-2 rounded-lg bg-primary/20 py-3 pl-4">
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
        {admin_dash_links.map((val, i) => (
          <AdminDashItem
            i={i}
            icon={val.icon}
            length={admin_dash_links.length}
            link={val.link}
            key={i}
            name={val.name}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashSidebar;
