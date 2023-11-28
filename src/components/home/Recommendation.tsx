"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import fallbackimage from "../../../public/image/fallbackimage.jpg";
import useFormatTime from "@/hooks/useFormatTime";
import useFormatPrice from "@/hooks/useFormatPrice";

type RecommendationProps = {
  recommendation: ActualRecommendation;
};

const Recommendation: React.FC<RecommendationProps> = ({ recommendation }) => {
  const router = useRouter();
  const formattedDate = useFormatTime(recommendation?.created_at);
  const imgurl = "http://127.0.0.1:8000/images/";
  const { formattedPrice } = useFormatPrice(recommendation.price);
  const location =
    (recommendation.District + ", " + recommendation.Municipality).substring(
      0,
      25
    ) + "...";

  const istitlelong = recommendation.pname.length;
  const formattedtitle =
    istitlelong >= 25
      ? recommendation.pname.substring(0, 25) + "..."
      : recommendation.pname;

  return (
    <div
      onClick={() => router.push(`/productdetails/${recommendation.id}`)}
      className="cursor-pointer hover:border-primary bg-white transition w-full h-[260px] col-span-1 shadow-md border-[2px] border-gray rounded-md px-2 pt-2 pb-2 flex flex-col gap-2"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          fill
          src={
            recommendation?.image.length === 0 ||
            recommendation?.image === undefined ||
            recommendation?.image[0]?.image_url === null ||
            recommendation?.image[0]?.image_url === undefined
              ? fallbackimage
              : imgurl + recommendation.image[0]?.image_url
          }
          alt="recommendation image"
          className="rounded-md w-full h-full object-fill mix-blend-darken bg-gray-300"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="sm:px-2 flex flex-col gap-5">
        <div>
          <h2 className="text-[1.1rem] sm:text-[1.5rem] font-bold">
            {formattedPrice}
          </h2>
          <p className="text-[15px] sm:text-[1rem] text-content text-lg">
            {formattedtitle}
          </p>
        </div>
        <div className="text-xs text-content flex justify-between items-center">
          <p>{location.toUpperCase()}</p>
          <p className="hidden sm:block">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
