import Image from "next/image";
import React from "react";

interface ProductUserProps {
  user_id: number;
  image_url: string;
  name: string;
}

const ProductUserDetail: React.FC<ProductUserProps> = ({
  user_id,
  image_url,
  name,
}) => {
  const imgurl = "http://127.0.0.1:8000/images/";
  return (
    <div>
      <div className="flex gap-4 items-center border border-gray-400 bg-zinc-200 py-3 px-4">
        <div className="w-[60px] h-[60px] relative">
          <Image
            fill
            className="rounded-full object-cover object-top"
            alt=""
            src={imgurl + image_url}
          />
        </div>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default ProductUserDetail;
