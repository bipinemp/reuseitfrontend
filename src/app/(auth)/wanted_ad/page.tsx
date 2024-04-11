"use client";

import Container from "@/components/Container";
import InputBox from "@/components/categories/forms/components/InputBox";
import { TWantedAd, WantedAdSchema } from "@/types/postTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaBox from "@/components/categories/forms/components/TextareaBox";
import { Button } from "@/components/ui/button";
import LocationBox from "./_components/LocationBox";
import { useUserProfile } from "@/apis/queries";
import { useMutation } from "@tanstack/react-query";
import { postWantedAd } from "@/apis/apicalls";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { data: UserDetail } = useUserProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TWantedAd>({
    resolver: zodResolver(WantedAdSchema),
    defaultValues: {
      adname: "",
      description: "",
      District: "",
      Municipality: "",
      Province: "",
    },
    resetOptions: { keepDefaultValues: true },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postWantedAd,
    onSuccess() {
      toast.success("Wanted Ad Created Successfully");
      reset();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: TWantedAd) => {
    const modifiedData = {
      user_id: UserDetail?.id,
      ...data,
    };
    if (UserDetail?.id) {
      mutate(modifiedData);
    }
  };

  return (
    <Container>
      <div className="mx-auto mb-20 flex w-[500px] flex-col items-center gap-y-10">
        <h1 className="text-[1.5rem] font-black opacity-80 sm:text-[2rem]">
          Wanted Ad
        </h1>
        <form
          className="flex w-full flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputBox<TWantedAd>
            name="adname"
            id="adname"
            placeholder="Enter Ad Name..."
            register={register}
            error={errors?.adname?.message || ""}
            desc="Enter the Title for the Wanted Ad"
            label="Ad Name"
          />
          <TextareaBox<TWantedAd>
            name="description"
            id="description"
            placeholder="Enter Ad Description..."
            register={register}
            error={errors?.adname?.message || ""}
            desc="Enter the Description for the Wanted Ad"
            label="Ad Description"
          />

          <LocationBox<TWantedAd>
            control={control as any}
            errors={errors}
            wanted={false}
          />

          <Button size="lg" className="text-[1rem] font-semibold tracking-wide">
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Posting...</p>
              </div>
            ) : (
              "Post"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Page;
