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
import clsx from "clsx";

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

  const typefile = file?.type.split("/")[0];

  return (
    <div className="relative flex h-full w-full rounded-lg border shadow-lg">
      <ScrollArea className="w-[60%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 px-12 py-6"
        >
          <h1 className="font-semibold">Register</h1>

          <p className="flex items-center gap-2">
            <span>Already have an account?</span>
            <Link
              className="font-semibold text-primary underline underline-offset-2"
              href={"/login"}
            >
              Login here
            </Link>
          </p>

          <div className="mt-4 flex flex-col gap-4">
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
                      name="Profile_image"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                        setFile(e.target.files?.[0]);
                      }}
                      hidden
                      ref={imgRef}
                      accept="image/jpg, image/jpeg, image/png, image/webp"
                    />
                  </div>
                );
              }}
            />

            <p className="font-semibold underline">Select Image</p>

            <div
              className="relative flex h-[100px] w-[100px] cursor-pointer flex-col gap-2 rounded-full"
              onClick={() => imgRef?.current?.click()}
            >
              {file && typefile === "image" ? (
                <Image
                  src={URL.createObjectURL(file)}
                  width={100}
                  height={100}
                  alt=""
                  className={clsx(
                    "cursor-pointer rounded-full border-[3px] border-content p-1",
                    {
                      "border-[3px] border-red-500":
                        errors.Profile_image?.message &&
                        typeof errors.Profile_image?.message === "string",
                    },
                  )}
                />
              ) : (
                <>
                  <Image
                    src={User}
                    width={100}
                    height={100}
                    alt=""
                    className="cursor-pointer rounded-full border-content p-1"
                  />
                </>
              )}
            </div>

            {errors.Profile_image?.message ? (
              <span className="pl-3 text-sm font-semibold text-destructive">
                {typeof errors.Profile_image?.message === "string"
                  ? errors.Profile_image.message
                  : null}
              </span>
            ) : null}

            <Button
              size="lg"
              className="text-[1rem] font-semibold tracking-wide"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
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
      <div className="relative flex h-full w-[40%] items-center justify-between border-l-[2px]">
        <Image src={Register} fill alt="" className="object-contain" />
      </div>
    </div>
  );
};

export default RegisterForm;
