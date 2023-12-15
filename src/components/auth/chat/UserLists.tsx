"use client";

import { formatDateMsg } from "@/apis/apicalls";
import { useGetUsersList } from "@/apis/queries";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UserLists = () => {
  const { data, isPending } = useGetUsersList();
  const UserLists = data as UserType[];

  const pathname = usePathname();
  const extractedPath = pathname.split("/");

  const imgurl = "http://127.0.0.1:8000/images/";

  return (
    <div className="w-[30%] flex flex-col gap-2 bg-zinc-100 py-3 px-3 rounded-md">
      <h2 className="font-black text-gray-600 underline underline-offset-2 ml-2">
        Users
      </h2>
      <div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {isPending ? (
          <div className="flex flex-col gap-1">
            <div className="bg-gray-300 animate-pulse max-w-[270px] h-[70px] py-3 px-5 rounded-md"></div>
            <div className="bg-gray-300 animate-pulse max-w-[270px] h-[70px] py-3 px-5 rounded-md"></div>
            <div className="bg-gray-300 animate-pulse max-w-[270px] h-[70px] py-3 px-5 rounded-md"></div>
            <div className="bg-gray-300 animate-pulse max-w-[270px] h-[70px] py-3 px-5 rounded-md"></div>
            <div className="bg-gray-300 animate-pulse max-w-[270px] h-[70px] py-3 px-5 rounded-md"></div>
          </div>
        ) : (
          UserLists?.map((user) => {
            const lastMsg =
              user.message.length >= 10
                ? user.message.substring(0, 10) + "..."
                : user.message;
            return (
              <Link
                href={`/user/${user.otherUserdata.id}`}
                key={user.id}
                className={clsx(
                  "flex gap-2 items-center h-[70px] py-3 px-5 rounded-md border-[1px]",
                  {
                    "bg-primary/20 border-[1px] border-primary":
                      parseInt(extractedPath[2]) === user.otherUserdata.id,
                  }
                )}
              >
                <div className="relative w-[48px] h-[40px]">
                  <Image
                    src={imgurl + user.otherUserdata.Profile_image}
                    fill
                    className="object-cover object-top border border-content rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col">
                  <p className="font-semibold text-gray-600">
                    {user.otherUserdata.name}
                  </p>
                  <p className="w-full text-content text-sm flex justify-between items-center">
                    <span>
                      {user.sender_id === user.authUserData.id ? "You: " : ""}{" "}
                      {lastMsg}
                    </span>
                    <span>{formatDateMsg(user.created_at || "")}</span>
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserLists;