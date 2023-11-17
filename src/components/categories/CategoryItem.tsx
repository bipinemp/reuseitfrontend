import React from "react";
import { IconType } from "react-icons";
import clsx from "clsx";

interface CategoryProps {
  length: number;
  i: number;
  icon: IconType;
  name: string;
}

const CategoryItem: React.FC<CategoryProps> = ({
  icon: Icon,
  name,
  i,
  length,
}) => {
  return (
    <div
      className={clsx(
        `flex items-center p-4 hover:bg-neutral-200 cursor-pointer transition`,
        {
          "border-b-gray border-b-[1px]": i !== length - 1,
        }
      )}
    >
      <Icon size={30} color="gray" />
      <p className="p-2">{name}</p>
    </div>
  );
};

export default CategoryItem;
