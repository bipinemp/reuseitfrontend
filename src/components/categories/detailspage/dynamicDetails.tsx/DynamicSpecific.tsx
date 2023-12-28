import React from "react";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  productDetails: any;
}

const DynamicSpecific: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className="flex w-full flex-col  gap-4 rounded-md border border-gray-400 bg-zinc-100 px-4 py-4 lg:w-[600px] xl:w-[800px] xl:px-10">
      <h1 className="text-[1.5rem] font-black text-gray-700 underline underline-offset-2 xl:text-[2rem]">
        Details
      </h1>
      <div className="flex flex-col gap-4 text-gray-700">
        {productDetails?.fields.map((field: any, index: number) => {
          const fieldName = field.name;
          const fieldValue = productDetails[fieldName];

          return (
            <div
              key={index}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
            >
              <div className="flex w-[185px] items-center gap-1 font-semibold text-gray-600 sm:w-fit">
                <MdPlayArrow size={20} />
                <h3 className="text-[0.75rem] sm:text-[1.17rem]">
                  {field.label} :
                </h3>
              </div>
              <p className="pl-5 text-[0.7rem] italic sm:pl-0 sm:text-[0.95rem]">
                {fieldValue}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicSpecific;
