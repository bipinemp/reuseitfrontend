"use client";

import { admin_dash_links } from "@/lib/lists";
import React from "react";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import AdminDashItem from "../auth/dashboard/AdminDashItem";
import { useUserProfile } from "@/apis/queries";

const AdminDashSidebar: React.FC = () => {
  const { data, isPending } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";
  return (
    <div className="fixed left-0 top-0 flex h-screen w-[280px] flex-col gap-5 bg-zinc-100 pl-4 pr-4 pt-7">
      <Link href={"/"}>
        <h2 className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2 text-center font-bold tracking-wide text-white">
          <ShoppingBasket className="h-7 w-7" />
          ReUseIt
        </h2>
      </Link>
      {isPending ? (
        <div className="flex animate-pulse items-center gap-2 rounded-lg py-3 pl-4">
          <div className="h-[50px] w-[55px] animate-pulse rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-2">
            <p className="h-[20px] w-[160px] animate-pulse rounded bg-gray-300"></p>
            <span className="h-[15px] w-[155px] animate-pulse rounded bg-gray-300"></span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 rounded-lg bg-primary/20 py-3 pl-4">
          <Image
            src={imgurl + data?.Profile_image}
            width={55}
            height={50}
            alt="profile picture"
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-800">{data?.name}</p>
            <span className="text-xs text-gray-700">{data?.email}</span>
          </div>
        </div>
      )}
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
