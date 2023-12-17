"use client";

import Link from "next/link";
import { RiChat3Line } from "react-icons/ri";
import { useGetChatCount } from "@/apis/queries";
import { cn } from "../../lib/utils";

const Chat: React.FC = () => {
  const { data } = useGetChatCount();
  const count = data?.count || 0;

  return (
    <Link
      href={"/user"}
      className="relative flex cursor-pointer p-2 rounded-full transition hover:bg-primary/20"
    >
      {count >= 1 && (
        <p
          className={cn(
            "w-[23px] h-[23px] text-xs -right-2 -top-[0.15rem] absolute flex items-center justify-center bg-destructive py-1 px-2 rounded-full text-white font-semibold",
            {
              "w-[32px] h-[27px]": count >= 10,
            }
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
