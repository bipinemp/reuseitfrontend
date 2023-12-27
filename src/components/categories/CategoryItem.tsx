import React from "react";
import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

interface CategoryProps {
  length: number;
  i: number;
  // icon?: IconType;
  name: string;
  link: string;
  id?: number;
  adminStatus?: number;
}

const CategoryItem: React.FC<CategoryProps> = ({
  // icon: Icon,
  name,
  i,
  length,
  link,
  adminStatus,
  id,
}) => {
  return (
    <Link
      href={adminStatus === 1 ? `/post/${link}/${id}` : `/post/${link}`}
      className={clsx(
        `flex cursor-pointer items-center p-4 transition hover:bg-neutral-200`,
        {
          "border-b-gray border-b-[1px]": i !== length - 1,
        },
      )}
    >
      {/* <Icon size={30} color="gray" /> */}
      <p className="p-2 text-[0.9rem] lg:text-[1rem]">{name}</p>
    </Link>
  );
};

export default CategoryItem;
