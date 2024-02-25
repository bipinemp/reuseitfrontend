"use client";

import { useUserProfile } from "@/apis/queries";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  const { data: UserData } = useUserProfile();

  const imgurl = "http://127.0.0.1:8000/images/";
  return (
    <div className="flex flex-col gap-4 rounded-md border border-gray-400 bg-zinc-100 px-4 py-3">
      <div className="flex items-center gap-4">
        <div className="relative h-[60px] w-[60px]">
          <Image
            fill
            className="rounded-full object-fill object-top"
            alt=""
            src={imgurl + image_url}
          />
        </div>
        <h3 className="text-[1rem] font-semibold sm:text-[1.17rem]">{name}</h3>
      </div>
      {UserData?.id ? (
        <Link href={`/user/${user_id}`}>
          <Button
            size="lg"
            className="flex items-center gap-2 font-semibold sm:text-lg"
          >
            <MessageCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            Chat with seller
          </Button>
        </Link>
      ) : (
        <Link href={`/login`}>
          <Button
            size="lg"
            className="flex items-center gap-2 font-semibold sm:text-lg"
          >
            <MessageCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            Chat with seller
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProductUserDetail;
