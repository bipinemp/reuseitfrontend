"use client";

import { loginCall, registerCall } from "@/apis/apicalls";
import InputBox from "@/components/categories/forms/components/InputBox";
import { Button } from "@/components/ui/button";
import { LoginSchema, TLogin } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginForm = () => {
  const queryClient = useQueryClient();

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
          label="Valid Email"
          type="text"
        />
        <InputBox<TLogin>
          name="password"
          id="password"
          placeholder="Enter Password..."
          register={register}
          error={errors?.password?.message || ""}
          label="Password ( 8 characters long )"
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
      </form>
    </div>
  );
};

export default LoginForm;
