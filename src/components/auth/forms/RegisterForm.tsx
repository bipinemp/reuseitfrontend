"use client";

import { registerCall } from "@/apis/apicalls";
import InputBox from "@/components/categories/forms/components/InputBox";
import RegisterLocationBox from "@/components/categories/forms/components/locations/RegisterLocationBox";
import { Button } from "@/components/ui/button";
import { RegisterSchema, TRegister } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Register from "../../../../public/image/register.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import User from "../../../../public/image/user.jpg";

const RegisterForm = () => {
  const [file, setFile] = useState<File | undefined>();
  const imgRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

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
      router.push("/login");
      router.refresh();
    },
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
    <div className="relative w-full h-full flex shadow-lg rounded-lg border">
      <ScrollArea className="w-[60%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 py-6 px-12"
        >
          <h1 className="font-semibold">Register</h1>

          <p className="flex gap-2 items-center">
            <span>Already have an account?</span>
            <Link
              className="text-primary font-semibold underline underline-offset-2"
              href={"/login"}
            >
              Login here
            </Link>
          </p>

          <div className="flex flex-col gap-4 mt-4">
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
                      hidden
                      ref={imgRef}
                    />
                    {errors.Profile_image?.message && (
                      <span>
                        {JSON.stringify(errors.Profile_image.message)}
                      </span>
                    )}
                  </div>
                );
              }}
            />
            <p className="font-semibold underline">Select Image</p>

            <div
              className="flex relative w-[100px] h-[100px] rounded-full flex-col gap-2 cursor-pointer"
              onClick={() => imgRef?.current?.click()}
            >
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  width={100}
                  height={100}
                  alt=""
                  className="rounded-full"
                />
              ) : (
                <>
                  <Image
                    src={User}
                    width={100}
                    height={100}
                    alt=""
                    className="p-1 border border-content cursor-pointer rounded-full"
                  />
                </>
              )}
            </div>
            <Button
              size="lg"
              className="text-[1rem] font-semibold tracking-wide"
            >
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p>Registering..</p>
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
      </ScrollArea>
      <div className="relative w-[40%] h-full flex items-center justify-between border-l-[2px]">
        <Image src={Register} fill alt="" className="object-contain" />
      </div>
    </div>
  );
};

export default RegisterForm;
