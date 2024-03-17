"use client";

import { formatDateMsg } from "@/apis/apicalls";
import { useGetUsersList } from "@/apis/queries";
import { cn } from "@/lib/utils";
import { useShowUsers } from "@/store/store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserLists = () => {
  const { data, isPending } = useGetUsersList();
  const { showUsers, users } = useShowUsers();

  const pathname = usePathname();
  const extractedPath = pathname.split("/");

  const imgurl = "http://127.0.0.1:8000/images/";

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-2 rounded-md bg-zinc-100 px-3 py-3 md:w-[60%] lg:w-[45%]",
        {
          hidden: users && screenWidth < 800,
          flex: screenWidth >= 800,
        },
      )}
    >
      <h2 className="ml-2 font-black text-gray-600 underline underline-offset-2">
        Users
      </h2>
      <div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {isPending ? (
          <div className="flex flex-col gap-1">
            <div className="h-[70px] min-w-[270px] max-w-[600px] animate-pulse rounded-md bg-gray-300 px-5 py-3"></div>
            <div className="h-[70px] min-w-[270px] max-w-[600px] animate-pulse rounded-md bg-gray-300 px-5 py-3"></div>
            <div className="h-[70px] min-w-[270px] max-w-[600px] animate-pulse rounded-md bg-gray-300 px-5 py-3"></div>
            <div className="h-[70px] min-w-[270px] max-w-[600px] animate-pulse rounded-md bg-gray-300 px-5 py-3"></div>
            <div className="h-[70px] min-w-[270px] max-w-[600px] animate-pulse rounded-md bg-gray-300 px-5 py-3"></div>
          </div>
        ) : (
          data?.map((user) => {
            const lastMsg =
              user.message.length >= 10
                ? user.message.substring(0, 10) + "..."
                : user.message;

            const unseenmsgs = user.unseen_msg || 0;

            return (
              <Link
                onClick={() => showUsers(true)}
                href={`/user/${user.otherUserdata.id}`}
                key={user.id}
                className={clsx(
                  "flex h-[70px] items-center gap-2 rounded-md border-[1px] px-5 py-3",
                  {
                    "border-[1px] border-primary bg-primary/20":
                      parseInt(extractedPath[2]) === user.otherUserdata.id,
                  },
                )}
              >
                <div className="relative h-[40px] w-[48px]">
                  <Image
                    src={imgurl + user.otherUserdata.Profile_image}
                    fill
                    className="rounded-full border border-content object-cover object-top"
                    alt=""
                  />
                  {user?.otherUserdata?.ActiveStatus === 1 && (
                    <span className="absolute -right-1 bottom-0 z-20 h-[15px] w-[15px] rounded-full border-[1px] border-white bg-green-600"></span>
                  )}
                </div>
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-600">
                      {user.otherUserdata.name}
                    </p>

                    <p
                      className={cn("flex items-center justify-center", {
                        "h-[20px] w-[20px] rounded-full bg-primary text-xs text-white":
                          unseenmsgs > 0,
                        "h-[26px] w-[30px]": unseenmsgs >= 10,
                      })}
                    >
                      {unseenmsgs >= 10
                        ? "10+"
                        : unseenmsgs === 0
                          ? ""
                          : unseenmsgs}
                    </p>
                  </div>
                  <p className="flex w-full items-center justify-between text-sm text-gray-700">
                    <p className="flex items-center gap-1">
                      <span>
                        {user.sender_id === user.authUserData.id ? "You: " : ""}{" "}
                      </span>
                      <span
                        className={cn("font-normal text-gray-500", {
                          "font-black text-gray-700":
                            user.sender_id !== user.authUserData.id &&
                            user.msg_status === 0,
                        })}
                      >
                        {lastMsg}
                      </span>
                    </p>
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
