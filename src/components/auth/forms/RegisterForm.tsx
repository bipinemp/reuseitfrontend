"use client";

import { registerCall } from "@/apis/apicalls";
import InputBox from "@/components/categories/forms/components/InputBox";
import RegisterLocationBox from "@/components/categories/forms/components/locations/RegisterLocationBox";
import { Button } from "@/components/ui/button";
import { RegisterSchema, TRegister } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [file, setFile] = useState<File | undefined>();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
  });

  // mutation function for Register
  const { mutate: CreateRegister, isPending } = useMutation({
    mutationFn: registerCall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Successfully Registered");
      reset();
    },
    // onSettled(data) {
    //   router.push(`/details/${data?.blog._id}`);
    // },
    onError: () => toast.error("Something went wrong try again"),
  });

  const onSubmit = async (data: TRegister) => {
    handleCreateRegister(data);
  };

  async function handleCreateRegister(data: TRegister) {
    const actual_Data = {
      ...data,
      Profile_image: file,
    };

    CreateRegister(actual_Data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputBox<TRegister>
          name="name"
          id="name"
          placeholder="Enter Name..."
          register={register}
          error={errors?.name?.message || ""}
          label="User Name"
          type="text"
        />
        <InputBox<TRegister>
          name="email"
          id="email"
          placeholder="Enter Email..."
          register={register}
          error={errors?.email?.message || ""}
          label="Valid Email"
          type="text"
        />
        <InputBox<TRegister>
          name="password"
          id="password"
          placeholder="Enter Password..."
          register={register}
          error={errors?.password?.message || ""}
          label="Password ( 8 characters long )"
          type="password"
        />

        <InputBox<TRegister>
          name="Phone_no"
          id="Phone_no"
          placeholder="Enter Phone No..."
          register={register}
          error={errors?.Phone_no?.message || ""}
          label="Phone Number"
        />

        {/* Location Box  */}
        <RegisterLocationBox control={control} errors={errors} />

        {/* Image Upload  */}
        <Controller
          name="Profile_image"
          control={control}
          render={({ field }) => {
            return (
              <div>
                <input
                  type="file"
                  {...register("Profile_image")}
                  name="Profile_image"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                    setFile(e.target.files?.[0]);
                  }}
                />
                {errors.Profile_image?.message && (
                  <span>{JSON.stringify(errors.Profile_image.message)}</span>
                )}
              </div>
            );
          }}
        />

        <Button size="lg" className="text-[1rem] font-semibold tracking-wide">
          {isPending ? (
            <div className="flex gap-2 items-center">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Registering..</p>
            </div>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
