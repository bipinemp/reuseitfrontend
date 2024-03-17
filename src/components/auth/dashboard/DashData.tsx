"use client";

import { useDashData } from "@/apis/queries";
import useFormatPrice from "@/hooks/useFormatPrice";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  CircleDollarSign,
  ShoppingBasket,
  Users,
} from "lucide-react";

const DashData = () => {
  const { data, isPending } = useDashData();
  const { formattedPrice } = useFormatPrice(+data?.Income! || 0);

  if (isPending) {
    return (
      <div className="flex items-center gap-10">
        <div className="h-[220px] w-[300px] animate-pulse rounded-lg bg-gray-300"></div>
        <div className="h-[220px] w-[300px] animate-pulse rounded-lg bg-gray-300"></div>
        <div className="h-[220px] w-[300px] animate-pulse rounded-lg bg-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-10">
      <div className="flex h-[220px] w-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-input px-8 py-4 shadow-lg">
        <div className="rounded-full bg-[#0088FE] p-5 text-white ">
          <ShoppingBasket className="h-10 w-10" />
        </div>
        <h2 className="font-bold text-gray-600">Products</h2>
        <p className="text-[1.3rem] font-semibold leading-3 text-gray-500">
          {data?.products}
        </p>
      </div>
      <div className="flex h-[220px] w-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-input px-8 py-4 shadow-lg">
        <div className="rounded-full bg-[#00C49F] p-5 text-white ">
          <Users className="h-10 w-10" />
        </div>
        <h2 className="font-bold text-gray-600">Total Engagement</h2>
        <p
          className={cn(
            "flex items-center gap-2 text-[1.3rem] font-semibold leading-3",
            {
              "text-green-400": data?.Engagedata.status === "increased",
              "text-destructive": data?.Engagedata.status === "decreased",
              "text-gray-500":
                data?.Engagedata.status === "unchanged" ||
                data?.Engagedata.status === "undefined",
            },
          )}
        >
          <span>
            {data?.Engagedata.status === "increased" ? (
              <ArrowUp className="h-5 w-5 text-green-400" strokeWidth={3} />
            ) : data?.Engagedata.status === "decreased" ? (
              <ArrowDown className="h-5 w-5 text-destructive" strokeWidth={3} />
            ) : null}
          </span>
          {data?.Engagedata.percentageGap.toFixed(2)}%
        </p>
      </div>
      <div className="flex h-[220px] w-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-input px-8 py-4 shadow-lg">
        <div className="rounded-full bg-destructive p-5 text-white ">
          <CircleDollarSign className="h-10 w-10" />
        </div>
        <h2 className="font-bold text-gray-600">Revenue</h2>
        <p className="text-[1.3rem] font-semibold leading-3 text-gray-500">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
};

export default DashData;
