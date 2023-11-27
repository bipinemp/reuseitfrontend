import React from "react";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  type_of_item: string;
  era_period: string;
  material: string;
  condition: string;
  provenance_location: string;
  rarity: string;
  historical_significance: string;
  certification: string;
}

const AntiquesSpecific: React.FC<Props> = ({
  certification,
  condition,
  era_period,
  historical_significance,
  material,
  provenance_location,
  rarity,
  type_of_item,
}) => {
  const arr = [
    {
      name: "Type Of Item",
      value: type_of_item,
    },
    {
      name: "Rarity",
      value: rarity,
    },
    {
      name: "Condition",
      value: condition,
    },
    {
      name: "Historical Significance",
      value: historical_significance,
    },
    {
      name: "Era Period",
      value: era_period,
    },
    {
      name: "Material",
      value: material,
    },
    {
      name: "Provenance Location",
      value: provenance_location,
    },
    {
      name: "certification",
      value: certification,
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
              {val.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AntiquesSpecific;
