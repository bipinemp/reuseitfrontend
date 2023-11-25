import { useUserProfile } from "@/apis/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Profile: React.FC = () => {
  const { data, isPending } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";

  if (isPending) {
    return (
      <div className="relative w-[40px] h-[40px] bg-gray-500 animate-pulse rounded-full"></div>
    );
  }

  if (!data?.id) {
    return (
      <Link href={"/login"}>
        <Button variant="default">Login</Button>
      </Link>
    );
  }

  return (
    <div className="relative w-[40px] h-[40px] cursor-pointer">
      <Image
        fill
        src={imgurl + data?.Profile_image}
        alt=""
        className="w-[40px] h-[40px] rounded-full bg-gray-500"
      />
    </div>
  );
};

export default Profile;
