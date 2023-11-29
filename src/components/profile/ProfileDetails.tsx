"use client";

import Image from "next/image";
import Container from "../Container";
import { useUserProfile } from "@/apis/queries";
import { CalendarDays, Edit, Loader2, Users } from "lucide-react";
import useFormatTime from "@/hooks/useFormatTime";
import ProfileProdCard from "./ProfileProdCard";
import { Button } from "../ui/button";
import { ProductDetailsLoading } from "@/loading/ProductDetailsLoading";

const ProfileDetails: React.FC = () => {
  const { data, isPending } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";
  const UserData = data as UserDetail;

  const formattedDate = useFormatTime(UserData?.created_at || "");

  if (isPending) {
    return <ProductDetailsLoading />;
  }

  return (
    <Container>
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-10 sm:justify-between mt-10 mb-10">
        <div className="flex flex-col gap-5 items-center w-full sm:w-[400px] h-[360px] bg-zinc-100 border border-content rounded-lg p-5">
          <div className="flex flex-col gap-2 items-center">
            <div className="relative w-[100px] h-[100px]">
              <Image
                fill
                src={imgurl + UserData?.Profile_image}
                alt="profile image"
                className="rounded-full border-[5px] border-primary bg-gray-400 object-cover object-top"
              />
            </div>
            <h2 className="font-bold text-gray-700">{UserData?.name}</h2>
          </div>
          <div className="flex flex-col gap-2 items-start text-gray-600">
            <p className="flex items-center gap-2 text-[0.8rem] md:text-[1rem]">
              <span>
                <CalendarDays className="w-[1.3rem] h-[1.3rem]" />
              </span>
              <span>Member since {formattedDate}</span>
            </p>

            <p className="text-sm">
              Posted{" "}
              <span className="text-black font-semibold">
                {UserData && UserData?.products.length}
              </span>{" "}
              ADs
            </p>

            <div className="flex gap-4 items-center text-[0.8rem] md:text-[1rem]">
              <span className="flex items-center gap-1">
                <Users className="w-[1rem] h-[1rem]" /> 123 Followers
              </span>
              <span>12 Following</span>
            </div>

            <Button
              size="lg"
              className="font-semibold md:text-lg tracking-wide flex items-center gap-2 "
            >
              <Edit className="md:w-5 md:h-5 w-4 h-4" /> Edit Profile
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 vsm:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-5 mb-5">
          {UserData?.products.map((prod) => (
            <ProfileProdCard product={prod} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProfileDetails;
