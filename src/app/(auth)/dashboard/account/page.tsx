"use client";

import { editUserProfile } from "@/apis/apicalls";
import { useUserProfile } from "@/apis/queries";
import DashboardContainer from "@/components/DashboardContainer";
import InputBox from "@/components/categories/forms/components/InputBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileDataSchema, TProfileData } from "@/types/postTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Page: React.FC = () => {
  const { data, isPending } = useUserProfile();
  const queryClient = useQueryClient();

  const imgurl = `http://127.0.0.1:8000/images/${data?.Profile_image}`;
  const [file, setFile] = useState<File | undefined>();

  const imgRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TProfileData>({
    resolver: zodResolver(ProfileDataSchema),
    defaultValues: {
      name: "",
      email: "",
      District: "",
      Province: "",
      Municipality: "",
    },
  });

  useEffect(() => {
    if (data && !isPending) {
      setValue("name", data?.name);
      setValue("email", data?.email);
      setValue("District", data?.District);
      setValue("Province", data?.Province);
      setValue("Municipality", data?.Municipality);
    }
  }, [data, setValue]);

  const { mutate, isPending: Editing } = useMutation({
    mutationKey: ["editUser"],
    mutationFn: editUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
      toast.success("Updated Successfully");
    },
    onError: () => toast.error("Something went wrong try again"),
  });

  if (isPending && !data) {
    return (
      <DashboardContainer>
        <div className="mt-20 flex w-[600px] items-center justify-center">
          <Loader2 className="h-24 w-24 animate-spin text-primary" />
        </div>
      </DashboardContainer>
    );
  }

  const onSubmit = async () => {
    const values = getValues();
    const editedProfileData = {
      ...values,
    };

    if (file !== undefined) {
      editedProfileData.Profile_image = file;
    }

    mutate(editedProfileData);
  };

  return (
    <DashboardContainer>
      <div className="mb-20 flex w-[600px] flex-col gap-6 px-14">
        <h1 className="font-black text-gray-600">Account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputBox<TProfileData>
            name="name"
            id="name"
            placeholder="Enter name..."
            register={register}
            error={errors?.name?.message || ""}
            label="Name"
          />

          <InputBox<TProfileData>
            name="email"
            id="email"
            placeholder="Enter email..."
            register={register}
            error={errors?.email?.message || ""}
            label="Email"
          />

          <InputBox<TProfileData>
            name="Province"
            id="Province"
            placeholder="Enter Province..."
            register={register}
            error={errors?.Province?.message || ""}
            label="Province"
          />

          <InputBox<TProfileData>
            name="District"
            id="District"
            placeholder="Enter District..."
            register={register}
            error={errors?.District?.message || ""}
            label="District"
          />

          <InputBox<TProfileData>
            name="Municipality"
            id="Municipality"
            placeholder="Enter Municipality..."
            register={register}
            error={errors?.Municipality?.message || ""}
            label="Municipality"
          />
          <div
            onClick={() => imgRef?.current?.click()}
            className="relative flex h-[50px] w-[150px] cursor-pointer items-center justify-center rounded-md border border-input bg-destructive text-white"
          >
            <p>Update Image</p>
            <Input
              ref={imgRef}
              className="hidden h-[50px] w-[150px]"
              type="file"
              name="Profile_image"
              onChange={(e) => setFile(e.target.files?.[0])}
              src={imgurl}
            />
          </div>

          <div className="w-[100px]">
            {errors?.Profile_image?.message && (
              <span className="text-sm text-destructive">
                {errors?.Profile_image?.message.toString()}
              </span>
            )}
            {!file && file === undefined && data?.Profile_image && (
              <Image
                width={100}
                height={100}
                src={imgurl}
                alt="profileimage"
                className="rounded-full"
              />
            )}
            {file && file !== undefined && (
              <div className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  width={100}
                  height={100}
                  alt="profile image"
                  className="rounded-full"
                />
                <span
                  onClick={() => setFile(undefined)}
                  className="absolute -right-2 top-0 flex cursor-pointer items-center justify-center rounded-full bg-destructive p-2 text-white transition hover:brightness-125"
                >
                  <X className="h-4 w-4" />
                </span>
              </div>
            )}
          </div>

          <Button
            size="lg"
            type="submit"
            className="text-[1rem] font-semibold tracking-wide"
          >
            {Editing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Updating..</p>
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </DashboardContainer>
  );
};

export default Page;
