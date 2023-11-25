"use client";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import React from "react";
import Container from "../Container";
import Image from "next/image";

interface UserProfileProps {
  token: string;
}

const UserProfile: React.FC = () => {
  const getUserProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/me",
        {},
        {
          headers: {
            "Content-type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const { data: UserData, isPending } = useQuery<UserDetail>({
    queryKey: ["userprofile"],
    queryFn: getUserProfile,
  });

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
