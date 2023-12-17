"use client";

import Link from "next/link";
import { RiChat3Line } from "react-icons/ri";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/apis/queries";
import { getCount } from "@/apis/apicalls";
import { cn } from "../../lib/utils";

const Chat: React.FC = () => {
  const { data } = useUserProfile();
  const [chatCount, setChatCount] = useState<number>(0);

  useEffect(() => {
    const pusher = new Pusher("ebf38d954ac2b949a6ca", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe(`user.${data?.id}`);

    channel.bind("count", function (data: any) {
      setChatCount(data.msgcount);
    });

    if (data?.id) {
      getCount(data?.id);
    }

    return () => {
      pusher.unsubscribe(`user.${data?.id}`);
    };
  }, [data?.id]);

  return (
    <Link
      href={"/user"}
      className="relative flex cursor-pointer p-2 rounded-full transition hover:bg-primary/20"
    >
      {chatCount >= 1 && (
        <p
          className={cn(
            "w-[25px] h-[25px] text-xs -right-1 -top-[0.15rem] absolute flex items-center justify-center bg-destructive py-1 px-2 rounded-full text-white font-semibold",
            {
              "w-[32px] h-[27px]": chatCount >= 10,
            }
          )}
        >
          {chatCount > 10 ? "10+" : chatCount}
        </p>
      )}
      <RiChat3Line size={25} />
    </Link>
  );
};

export default Chat;
