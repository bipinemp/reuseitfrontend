"use client";

import { formatDateMsg } from "@/apis/apicalls";
import { useGetUsersList } from "@/apis/queries";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UserLists = () => {
  const { data } = useGetUsersList();
  const UserLists = data as UserType[];

  const pathname = usePathname();
  const extractedPath = pathname.split("/");

  const imgurl = "http://127.0.0.1:8000/images/";

  return (
    <div className="w-[30%] flex flex-col gap-2 bg-zinc-100 py-3 px-3">
      <h2 className="font-black text-gray-600 underline underline-offset-2 ml-2">
        Users
      </h2>
      <div className="overflow-y-auto">
        {UserLists?.map((user) => (
          <Link
            href={`/user/${user.receiver_id}`}
            key={user.id}
            className={clsx(
              "flex gap-2 items-center py-3 px-5 rounded-md border-[1px]",
              {
                "bg-primary/20 border-[1px] border-primary":
                  parseInt(extractedPath[2]) === user.receiver_id,
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
                  {user.message}
                </span>
                <span>{formatDateMsg(user.created_at || "")}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserLists;
