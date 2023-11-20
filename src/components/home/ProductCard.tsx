import Image from "next/image";
import React from "react";
import fallbackimage from "../../../public/image/fallbackimage.jpg";
import useFormatTime from "@/hooks/useFormatTime";
import useFormatPrice from "@/hooks/useFormatPrice";

type ProductProps = {
  product: Product;
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const formattedDate = useFormatTime(product?.created_at);
  const imgurl = "http://127.0.0.1:8000/images/";
  const { formattedPrice } = useFormatPrice(product.price);
  const location =
    (product.District + ", " + product.Municipality).substring(0, 25) + "...";

  return (
    <div className="cursor-pointer hover:border-primary transition w-full h-[310px] max-h-[325px] col-span-1 shadow-md border-[2px] border-gray rounded-md px-2 pt-2 pb-2 flex flex-col gap-2">
      <div className="relative w-full aspect-square overflow-hidden">
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
          className="rounded-md w-full h-full object-cover mix-blend-darken bg-gray-300"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="sm:px-2 flex flex-col gap-5">
        <div>
          <h2 className="font-bold">{formattedPrice}</h2>
          <p className="text-content text-lg">{product.pname}</p>
        </div>
        <div className="text-xs text-content flex justify-between items-center">
          <p>{location.toUpperCase()}</p>
          <p className="hidden sm:block">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
