"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import fallbackimage from "../../../public/image/fallbackimage.jpg";
import useFormatTime from "@/hooks/useFormatTime";
import useFormatPrice from "@/hooks/useFormatPrice";

type ProductProps = {
  product: UserProducts;
};

const ProfileProdCard: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter();
  const formattedDate = useFormatTime(product?.created_at);
  const imgurl = "http://127.0.0.1:8000/images/";
  const { formattedPrice } = useFormatPrice(product.price);
  const location =
    (product.District + ", " + product.Municipality).substring(0, 25) + "...";

  const istitlelong = product.pname.length;
  const formattedtitle =
    istitlelong >= 25 ? product.pname.substring(0, 25) + "..." : product.pname;

  return (
    <div
      onClick={() => router.push(`/productdetails/${product.id}`)}
      className="border-gray col-span-1 flex h-[310px] max-h-[325px] w-full cursor-pointer flex-col gap-2 rounded-md border-[2px] px-2 pb-2 pt-2 shadow-md transition hover:border-primary"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          fill
          src={
            product?.image.length === 0 ||
            product?.image === undefined ||
            product?.image[0]?.image_url === null ||
            product?.image[0]?.image_url === undefined
              ? fallbackimage
              : imgurl + product.image[0]?.image_url
          }
          alt="product image"
          className="h-full w-full rounded-md bg-gray-300 object-cover mix-blend-darken"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-5 sm:px-2">
        <div>
          <h2 className="font-bold">{formattedPrice}</h2>
          <p className="text-lg text-content">{formattedtitle}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-content">
          <p>{location.toUpperCase()}</p>
          <p className="hidden sm:block">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileProdCard;
