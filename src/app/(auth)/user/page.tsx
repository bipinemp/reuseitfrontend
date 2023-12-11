"use client";

import { useGetLatestMessageId } from "@/apis/queries";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { data } = useGetLatestMessageId();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push(`/user/${data}`);
    }
  }, [data]);

  return <div className="w-full h-full"></div>;
};

export default page;
