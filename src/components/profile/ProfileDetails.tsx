"use client";

import Container from "../Container";
import { useUserProfile } from "@/apis/queries";

const ProfileDetails: React.FC = () => {
  const { data, isPending } = useUserProfile();
  const UserData: UserDetail = data;

  return (
    <Container>
      <div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default ProfileDetails;
