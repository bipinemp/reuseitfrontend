"use client";

import Image from "next/image";
import Container from "../Container";
import { useUserProfile } from "@/apis/queries";
import { CalendarDays, CalendarSearch } from "lucide-react";
import useFormatTime from "@/hooks/useFormatTime";

const ProfileDetails: React.FC = () => {
  const { data, isPending } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";
  const UserData: UserDetail | undefined = data;
  const formattedDate = useFormatTime(UserData?.created_at || "");

  return (
    <Container>
      <div className="flex gap-10 justify-between mt-10">
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
            <p className="flex items-center gap-2 text-gray-600">
              <span>
                <CalendarDays className="w-[1.3rem] h-[1.3rem]" />
              </span>
              <span className="text-sm">Member since {formattedDate}</span>
            </p>
          </div>
        </div>
        <div className="w-full">
          <h1>No Posts right now ...</h1>
        </div>
      </div>
    </Container>
  );
};

export default ProfileDetails;
