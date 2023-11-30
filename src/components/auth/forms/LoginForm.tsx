"use client";

import { loginCall } from "@/apis/apicalls";
import InputBox from "@/components/categories/forms/components/InputBox";
import { Button } from "@/components/ui/button";
import { LoginSchema, TLogin } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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

    onSettled: (data: any, error, variables, context) => {
      //   console.log(data);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

        <div>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              className="text-primary font-semibold underline underline-offset-2"
              href={"/register"}
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
