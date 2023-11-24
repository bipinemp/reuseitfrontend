"use client";

import axios from "axios";
import React, { useEffect } from "react";

interface ProfileProps {
  token: string;
}

const UserProfile: React.FC<ProfileProps> = ({ token }) => {
  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.post("http://localhost:8000/api/me",{}, {
        headers:{
          "Content-type" : "application/json",
          "Authorization" : `Bearer ${token}`
      }
      });
      console.log(response);
    };

    getProfile();
  }, []);
  return <div></div>;
};

export default UserProfile;
