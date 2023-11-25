import useFormatPrice from "@/hooks/useFormatPrice";
import useFormatTime from "@/hooks/useFormatTime";
import React from "react";

interface Props {
  pname: string;
  price: number;
  created_at: string;
  Province: string;
  District: string;
  Municipality: string;
}

const ElectronicPriceName: React.FC<Props> = ({
  pname,
  price,
  created_at,
  Province,
  District,
  Municipality,
}) => {
  const { formattedPrice } = useFormatPrice(price);
  const formattedDate = useFormatTime(created_at);
  return (
    <div className="bg-zinc-100 rounded-md border border-gray-400 h-[170px] py-3 px-4 flex flex-col justify-between">
      <div>
        <h1 className="font-semibold">{formattedPrice}</h1>
        <p className="text-lg">{pname}</p>
      </div>
      <div className="flex justify-between font-semibold items-start text-[0.8rem] text-content">
        <p className="">
          {Province}, {District} <br /> {Municipality}
        </p>
        <p className="">{formattedDate}</p>
      </div>
    </div>
  );
};

export default ElectronicPriceName;
