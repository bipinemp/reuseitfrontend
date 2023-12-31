import useFormatPrice from "@/hooks/useFormatPrice";
import useFormatTime from "@/hooks/useFormatTime";
import { Share2 } from "lucide-react";
import React from "react";

interface Props {
  pname: string;
  price: number;
  created_at: string;
  Province: string;
  District: string;
  Municipality: string;
}

const PriceNameDetails: React.FC<Props> = ({
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
    <div className="relative bg-zinc-100 rounded-md border border-gray-400 w-full min-h-[170px] py-3 px-4 flex flex-col justify-between">
      <div className="flex w-full justify-between items-start">
        <div>
          <h1 className="font-black text-[1.5rem] xl:text-[2rem]  tracking-[0.05rem] text-black/80">
            {formattedPrice}
          </h1>
          <p className="text-md xl:text-lg">{pname}</p>
        </div>
        <div className="mt-2">
          <Share2 className="w-6 h-6" />
        </div>
      </div>
      <div className="flex w-full justify-between font-semibold items-start text-[0.7rem] xl:text-[0.8rem] text-content">
        <p className="">
          {Province}, {District} <br /> {Municipality}
        </p>
        <p className="">{formattedDate}</p>
      </div>
    </div>
  );
};

export default PriceNameDetails;
