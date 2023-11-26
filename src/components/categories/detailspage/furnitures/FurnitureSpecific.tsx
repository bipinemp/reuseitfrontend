import React from "react";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  type_of_furniture: string;
  material: string;
  dimensions: string;
  color: string;
  style: string;
  condition: string;
  assembly_required: string;
}

const FurnitureSpecific: React.FC<Props> = ({
  type_of_furniture,
  assembly_required,
  color,
  condition,
  dimensions,
  material,
  style,
}) => {
  const arr = [
    {
      name: "Type Of Furniture",
      value: type_of_furniture,
    },
    {
      name: "Material",
      value: material,
    },
    {
      name: "Condition",
      value: condition,
    },
    {
      name: "Color",
      value: color,
    },
    {
      name: "Dimensions",
      value: dimensions,
    },
    {
      name: "Style",
      value: style,
    },
    {
      name: "Assembly Required",
      value: assembly_required,
    },
  ];
  return (
    <div className="flex w-full lg:w-[600px]  xl:w-[800px] py-4 px-4 xl:px-10 flex-col gap-4 bg-zinc-100 rounded-md border border-gray-400">
      <h1 className="text-[1.5rem] xl:text-[2rem] font-black text-gray-700 underline underline-offset-2">
        Details
      </h1>
      <div className="flex flex-col gap-4 text-gray-700">
        {arr.map((val, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-center"
          >
            <div className="font-semibold w-[185px] sm:w-fit flex items-center gap-1 text-gray-600">
              <MdPlayArrow size={20} />
              <h3 className="text-[0.75rem] sm:text-[1.17rem]">{val.name} :</h3>
            </div>
            <p className="italic text-[0.7rem] sm:text-[0.95rem] pl-5 sm:pl-0">
              {val.name === "Assembly Required"
                ? val.value == "0"
                  ? "NO"
                  : val.value == "1"
                  ? "Yes"
                  : val.value
                : val.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureSpecific;
