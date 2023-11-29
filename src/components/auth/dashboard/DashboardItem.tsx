"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardItemProps {
  length: number;
  i: number;
  icon: LucideIcon;
  name: string;
  link: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({
  icon: Icon,
  name,
  i,
  length,
  link,
}) => {
  const pathname = usePathname();
  let regex = /^\/dashboard(?:\/(.*))?/;
  const extractPath = pathname.replace(regex, "/$1");

  return (
    <Link
      href={`/dashboard${link}`}
      className={clsx(
        `flex items-center py-1 pl-4 pr-16 rounded-lg font-semibold hover:bg-neutral-200 cursor-pointer transition`,
        {
          "bg-neutral-200": extractPath === link,
        }
      )}
    >
      <Icon
        className={clsx("text-gray-600 w-[1.3rem] h-[1.3rem]", {
          "text-[#05011c]": extractPath === link,
        })}
        strokeWidth={3}
      />
      <p
        className={clsx("p-2 text-[0.9rem] text-gray-500", {
          "opacity-100 text-[#05011c]": extractPath === link,
        })}
      >
        {name}
      </p>
    </Link>
  );
};

export default DashboardItem;
