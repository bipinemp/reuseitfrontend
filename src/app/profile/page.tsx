import React from "react";
// import { cookies } from "next/headers";
import UserProfile from "@/components/auth/UserProfile";

const page = () => {
  // const cookieStore = cookies();
  // const token = cookieStore.get("jwt")?.value;
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default page;
