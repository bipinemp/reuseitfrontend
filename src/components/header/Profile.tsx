import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <div className="relative w-[40px] h-[40px] cursor-pointer">
      <Image
        fill
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="w-[40px] h-[40px] rounded-full"
      />
    </div>
  );
};

export default Profile;
