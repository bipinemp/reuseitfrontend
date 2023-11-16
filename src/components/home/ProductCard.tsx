import Image from "next/image";
import React from "react";
import fallbackimage from "../../../public/image/fallbackimage.jpg";
import useFormatTime from "@/hooks/useFormatTime";

type ProductProps = {
  product: Product;
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const formattedDate = useFormatTime(product?.created_at);
  const imgurl = "http://127.0.0.1:8000/images/";

  return (
    <div className="aspect-square w-full max-h-[310px] col-span-1 shadow-md border-[1px] border-gray rounded-md px-2 pt-2 pb-2 flex flex-col gap-2">
      <div className="relative w-full h-[200px]">
        <Image
          fill
          src={
            product?.image[0]?.image_url === null ||
            product?.image[0]?.image_url === undefined
              ? fallbackimage
              : imgurl + product.image[0]?.image_url
          }
          alt="product image"
          className="rounded-md w-full h-full object-fill"
        />
      </div>
      <div className="px-2 flex flex-col gap-5">
        <div>
          <h3 className="font-bold">Rs. {product.price}</h3>
          <p className="text-content">{product.pname}</p>
        </div>
        <div className="text-xs text-content flex justify-between items-center">
          <p>Gaindakot-05, Nawalpur</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
