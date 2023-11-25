"use client";

import Container from "../Container";
import { useUserProfile } from "@/apis/queries";

const UserProfile: React.FC = () => {
  const { data: UserData, isPending } = useUserProfile();

  const UserDetails = (
    <div>
      <h1>{UserData?.name}</h1>
      <h1>{UserData?.email}</h1>
    </div>
  );

  return (
    <Container>
      <div>{isPending ? <h3>Loading User Data...</h3> : null}</div>
      <div>{UserDetails}</div>
    </Container>
  );
};

export default UserProfile;
