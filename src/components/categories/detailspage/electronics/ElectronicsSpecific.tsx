import React from "react";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  type_of_electronic: string;
  brand: string;
  model: string;
  condition: string;
  warranty_information: string;
}

const ElectronicsSpecific: React.FC<Props> = ({
  type_of_electronic,
  brand,
  model,
  condition,
  warranty_information,
}) => {
  const arr = [
    {
      name: "Type Of Electronic",
      value: type_of_electronic,
    },
    {
      name: "Brand",
      value: brand,
    },
    {
      name: "Model",
      value: model,
    },
    {
      name: "Condition",
      value: condition,
    },
    {
      name: "Warranty Information",
      value: warranty_information,
    },
  ];
  return (
    <div className="flex w-[63.2%] p-4 px-10 flex-col gap-4 bg-zinc-100 rounded-md border border-gray-400">
      <h1 className="font-black text-gray-700 underline underline-offset-2">
        Details
      </h1>
      <ul className="flex flex-col gap-4 text-gray-700">
        {arr.map((val, index) => (
          <li key={index} className="flex gap-4 items-center">
            <h3 className="font-semibold flex items-center gap-2 text-gray-600">
              <MdPlayArrow size={25} /> {val.name} :
            </h3>
            <p className="italic">{val.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElectronicsSpecific;
