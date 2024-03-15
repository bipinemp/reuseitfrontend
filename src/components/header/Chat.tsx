"use client";

import Link from "next/link";
import { RiChat3Line } from "react-icons/ri";
import { useGetChatCount, useUserProfile } from "@/apis/queries";
import { cn } from "../../lib/utils";

const Chat: React.FC = () => {
  const { data } = useGetChatCount();
  const { data: UserData } = useUserProfile();
  const count = data?.count || 0;

  if (!UserData?.id) {
    return null;
  }

  return (
    <Link
      href={"/user"}
      className="relative flex cursor-pointer rounded-full p-2 transition hover:bg-primary/20"
    >
      {count >= 1 && (
        <p
          className={cn(
            "absolute -right-2 -top-[0.15rem] flex h-[23px] w-[23px] items-center justify-center rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-white",
            {
              "h-[27px] w-[32px]": count >= 10,
            },
          )}
        >
          {count >= 10 ? "10+" : count === 0 ? "" : count}
        </p>
      )}
      <RiChat3Line size={25} />
    </Link>
  );
};

export default Chat;
