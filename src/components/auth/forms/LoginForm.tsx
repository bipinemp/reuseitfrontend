"use client";

import { loginCall, sendEmail } from "@/apis/apicalls";
import InputBox from "@/components/categories/forms/components/InputBox";
import { Button } from "@/components/ui/button";
import { LoginSchema, TLogin } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Login from "../../../../public/image/login.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const router = useRouter();

  // For forget password logic
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const { mutate: SendEmail, isPending: forgetPassPending } = useMutation({
    mutationKey: ["forgetpassword"],
    mutationFn: sendEmail,
    onSuccess() {
      toast.success("Reset Link Send to Mail");
    },
    onError(){
      toast.error("Something went wrong, Try again")
    }
  });

  function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    SendEmail(email);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
  });

  // mutation function for Login
  const { mutate: CreateLogin, isPending } = useMutation({
    mutationFn: loginCall,

    onSettled: (data: any) => {
      if (data.status === 200) {
        toast.success("Successfully Logged IN");
        reset();
        router.back();
        router.refresh();
      }
      if (data.status !== 200) {
        toast.error(data.response.data.error);
      }
    },
  });

  const onSubmit = async (data: TLogin) => {
    CreateLogin(data);
  };

  return (
    <div className="relative flex h-full w-full rounded-lg border shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[60%] flex-col gap-4 px-12 py-6"
      >
        <h1 className="font-semibold">Login</h1>

        <p className="flex items-center gap-2">
          <span>Don&apos;t have an account?</span>
          <Link
            className="font-semibold text-primary underline underline-offset-2"
            href={"/register"}
          >
            Register here
          </Link>
        </p>

        <div className="mt-4 flex flex-col gap-4">
          <InputBox<TLogin>
            name="email"
            id="email"
            placeholder="Enter Email..."
            register={register}
            error={errors?.email?.message || ""}
            label="Email"
            type="text"
          />
          <InputBox<TLogin>
            name="password"
            id="password"
            placeholder="Enter Password..."
            register={register}
            error={errors?.password?.message || ""}
            label="Password"
            type="password"
          />

          <div>
            <p
              onClick={handleOpenDialog}
              className="cursor-pointer font-semibold text-primary underline underline-offset-2"
            >
              Forgot Password?
            </p>
          </div>

          <Button size="lg" className="text-[1rem] font-semibold tracking-wide">
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Logging In..</p>
              </div>
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </form>

      <div className="relative flex h-full w-[40%] items-center justify-between border-l-[2px]">
        <Image src={Login} fill alt="" className="object-contain" />
      </div>

      {/* For Forgot Password Dialog for putting email */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-8">
            <DialogTitle>Enter your Email.</DialogTitle>
            <DialogDescription>
              <form
                onSubmit={handleEmailSubmit}
                className="flex flex-col gap-4"
              >
                <Input
                  placeholder="Enter Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <Button
                  size="lg"
                  className="text-[1rem] font-semibold tracking-wide"
                >
                  {forgetPassPending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <p>Sending...</p>
                    </div>
                  ) : (
                    "Send"
                  )}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginForm;
