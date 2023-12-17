"use client";

import { useGetLatestMessageId } from "@/apis/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { data } = useGetLatestMessageId();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push(`/user/${data}`);
    }
  }, [data]);

  return <div className="w-full h-full"></div>;
};

export default Page;
