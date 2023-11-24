import React from "react";
import { cookies } from "next/headers";
import UserProfile from "@/components/auth/UserProfile";

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;
  console.log(token);
  return (
    <div>
      <UserProfile token={token || ""} />
    </div>
  );
};

export default page;
