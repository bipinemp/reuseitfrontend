"use client";

import { logoutCall } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const SidebarLogout: React.FC = () => {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logoutCall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
      toast.success("Logged Out");
    },
  });
  return (
    <div
      className="p-4 flex items-center gap-2 cursor-pointer rounded transition hover:bg-neutral-100"
      onClick={() => logoutUser()}
    >
      <LogOut className="mr-2 h-6 w-6" />
      <h3>{isPending ? "Logging Out..." : "Log out"}</h3>
    </div>
  );
};

export default SidebarLogout;
