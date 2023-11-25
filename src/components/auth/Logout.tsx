"use client";

import { logoutCall } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import React from "react";

const Logout: React.FC = () => {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logoutCall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
    },
  });
  return (
    <div onClick={() => logoutUser()}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </div>
  );
};

export default Logout;
