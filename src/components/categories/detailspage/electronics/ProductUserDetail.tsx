import { Button } from "@/components/ui/button";
import { ChefHat, MessageCircleIcon } from "lucide-react";
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
    <div className="flex flex-col gap-4 border border-gray-400 bg-zinc-100 rounded-md py-3 px-4">
      <div className="flex gap-4 items-center">
        <div className="w-[60px] h-[60px] relative">
          <Image
            fill
            className="rounded-full object-cover object-top"
            alt=""
            src={imgurl + image_url}
          />
        </div>
        <h3 className="font-semibold">{name}</h3>
      </div>
      <Button
        size="lg"
        className="text-lg font-semibold flex items-center gap-2"
      >
        <MessageCircleIcon className="w-6 h-6" />
        Chat with seller
      </Button>
    </div>
  );
};

export default ProductUserDetail;
