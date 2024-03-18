"use client";

import { sendResetData } from "@/apis/apicalls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: sendResetData,
    onSuccess(data) {
      if (data.message === "Password has been reset.") {
        toast.success("Password Reset Successfully");
        router.push("/");
      }
    },
    onError: () => {
      toast.error("Something went wrong, Try again");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords doesn't match !!!");
    } else {
      if (token && email) {
        const data: TResetPassword = {
          token,
          email,
          password,
          password_confirmation: confirmPassword,
        };

        mutate(data);
      }
    }
  }

  return (
    <div className="relative mx-auto mt-20 flex h-full w-[500px] flex-col gap-6 rounded-lg border px-12 py-6 shadow-lg">
      <h1 className="text-center font-semibold underline">
        Enter New Password.
      </h1>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <Input
          placeholder="Enter New Password"
          value={password}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="border-content"
        />
        <Input
          placeholder="Confirm New Password"
          value={confirmPassword}
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-content"
        />

        <Button size="lg" className="text-[1rem] font-semibold tracking-wide">
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Resetting...</p>
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
