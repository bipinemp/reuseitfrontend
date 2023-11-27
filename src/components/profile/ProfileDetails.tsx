"use client";

import Image from "next/image";
import Container from "../Container";
import { useUserProfile } from "@/apis/queries";
import { CalendarSearch } from "lucide-react";

const ProfileDetails: React.FC = () => {
  const { data, isPending } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";
  const UserData: UserDetail | undefined = data;

  return (
    <Container>
      <div className="flex justify-between mt-10">
        <div className="flex flex-col gap-5 items-center w-[400px] bg-zinc-100 rounded-lg p-5">
          <div className="flex flex-col gap-2 items-center">
            <div className="relative w-[100px] h-[100px]">
              <Image
                fill
                src={imgurl + UserData?.Profile_image}
                alt="profile image"
                className="rounded-full bg-gray-400 object-cover object-top"
              />
            </div>
            <h2 className="font-bold text-gray-700">{UserData?.name}</h2>
          </div>
          <div>
            <p>
              <CalendarSearch className="w-5 h-5" />
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </Container>
  );
};

export default ProfileDetails;
