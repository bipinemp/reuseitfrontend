"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import fallbackimage from "../../../public/image/fallbackimage.jpg";
import useFormatTime from "@/hooks/useFormatTime";
import useFormatPrice from "@/hooks/useFormatPrice";

type ProductProps = {
  product: Product;
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
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
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square max-h-[14rem] w-full overflow-hidden rounded-xl">
          <Image
            fill
            src={
              product?.image === undefined ||
              product?.image.length === 0 ||
              product?.image[0]?.image_url === null ||
              product?.image[0]?.image_url === undefined
                ? fallbackimage
                : imgurl + product.image[0]?.image_url
            }
            alt="product image"
            className="h-full w-full  object-cover transition group-hover:scale-110"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 z-30 bg-gradient-to-b from-gray-700/10 via-gray-900/10 to-black/30"></div>
          <div className="font-semi-bold absolute bottom-0 z-30 flex w-full items-center justify-between px-3 pb-2 text-[0.8rem] text-white">
            <p>{location.toUpperCase()}</p>
            <p className="hidden sm:block">{formattedDate}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-gray-800">{formattedPrice}</h2>
          <p className="text-lg text-content">{formattedtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
