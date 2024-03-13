"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminDashItemProps {
  length: number;
  i: number;
  icon: LucideIcon;
  name: string;
  link: string;
}

const AdminDashItem: React.FC<AdminDashItemProps> = ({
  icon: Icon,
  name,
  i,
  length,
  link,
}) => {
  const pathname = usePathname();
  let regex = /^\/admin(?:\/(.*))?/;
  const extractPath = pathname.replace(regex, "/$1");

  return (
    <Link
      href={`/admin${link}`}
      className={clsx(
        `flex cursor-pointer items-center rounded-lg py-1 pl-4 pr-16 font-semibold transition hover:bg-neutral-200`,
        {
          "bg-neutral-200": extractPath === link,
        },
      )}
    >
      <Icon
        className={clsx("h-[1.3rem] w-[1.3rem] text-gray-600", {
          "text-[#05011c]": extractPath === link,
        })}
        strokeWidth={3}
      />
      <p
        className={clsx("p-2 text-[0.9rem] text-gray-500", {
          "text-[#05011c] opacity-100": extractPath === link,
        })}
      >
        {name}
      </p>
    </Link>
  );
};

export default AdminDashItem;
