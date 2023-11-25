import { useUserProfile } from "@/apis/queries";
import Image from "next/image";
import React from "react";

const Profile: React.FC = () => {
  const { data } = useUserProfile();
  return (
    <div className="relative w-[40px] h-[40px] cursor-pointer">
      <Image
        fill
        src={`${data?.Profile_image}`}
        alt="@shadcn"
        className="w-[40px] h-[40px] rounded-full"
      />
    </div>
  );
};

export default Profile;
