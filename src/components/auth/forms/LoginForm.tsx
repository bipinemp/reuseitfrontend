"use client";

import { loginCall } from "@/apis/apicalls";
import InputBox from "@/components/categories/forms/components/InputBox";
import { Button } from "@/components/ui/button";
import { LoginSchema, TLogin } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Login from "../../../../public/image/login.png";
import Register from "../../../../public/image/register.png";
import { Checkbox } from "@/components/ui/checkbox";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
  });

  // mutation function for Register
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
    <div className="relative w-full h-full flex shadow-lg rounded-lg border">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[60%] flex flex-col gap-4 py-6 px-12"
      >
        <h1 className="font-semibold">Login</h1>

        <p className="flex gap-2 items-center">
          <span>Don&apos;t have an account?</span>
          <Link
            className="text-primary font-semibold underline underline-offset-2"
            href={"/register"}
          >
            Register here
          </Link>
        </p>

        <div className="flex flex-col gap-4 mt-4">
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
            <p className="text-primary font-semibold underline underline-offset-2 cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <Button size="lg" className="text-[1rem] font-semibold tracking-wide">
            {isPending ? (
              <div className="flex gap-2 items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Logging In..</p>
              </div>
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </form>

      <div className="relative w-[40%] h-full flex items-center justify-between border-l-[2px]">
        <Image src={Login} fill alt="" className="object-contain" />
      </div>
    </div>
  );
};

export default LoginForm;
