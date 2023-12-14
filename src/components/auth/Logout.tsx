"use client";

import { logoutCall } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Logout: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logoutCall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
      toast.success("Logged Out");
      router.refresh();
    },
  });
  return (
    <div
      className="flex items-center px-3 py-2 cursor-pointer rounded hover:bg-neutral-100"
      onClick={() => logoutUser()}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Logging Out...</span>
          </div>
        ) : (
          "Log out"
        )}
      </span>
    </div>
  );
};

export default Logout;
