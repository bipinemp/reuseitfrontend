"use client";

import { useCategoryDetails, useUserProfile } from "@/apis/queries";
import { DynamicFormSchema, TDynamicForm } from "@/types/postTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PriceBox from "@/components/categories/forms/components/PriceBox";
import InputBox from "@/components/categories/forms/components/InputBox";
import TextareaBox from "@/components/categories/forms/components/TextareaBox";
import { z } from "zod";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import DynamicLocationBox from "@/components/categories/forms/components/locations/DynamicLocationBox";
import FileUpload from "@/components/categories/forms/components/FileUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNewProduct, sendOtp, sendPhoneNumber } from "@/apis/apicalls";
import toast from "react-hot-toast";
import OtpDialog from "@/components/categories/dialogs/OtpDialog";
import PhoneDialog from "@/components/categories/dialogs/PhoneDialog";

interface PageProps {
  params: {
    slug: string[];
  };
}

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Page: React.FC<PageProps> = ({ params }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: cateData, isPending } = useCategoryDetails(
    parseInt(params.slug[1]),
  );
  const { data: UserData } = useUserProfile();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");

  const [phoneDialog, setPhoneDialog] = useState<boolean>(false);
  const [otpDialog, setOtpDialog] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // for OTP
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function formatCategory(inputString: string) {
    // Split the input string by underscores
    var parts = inputString.split("_");

    // Capitalize the first letter of each part
    for (var i = 0; i < parts.length; i++) {
      parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
    }

    // Join the parts back together without underscores
    var formattedString = parts.join(" ");

    return formattedString;
  }

  // Assuming `fields` is the array you get from the API
  const apiFields = cateData?.fields?.reduce(
    (acc: Record<string, any>, field: any) => {
      acc[field.name] = z
        .string()
        .min(1, { message: `You must enter a ${field.name}` });
      return acc;
    },
    {},
  );

  // Combine your existing schema with the new fields
  const CombinedSchema = z.object({
    ...DynamicFormSchema.shape,
    ...apiFields,
  });

  // Use the combined schema in your form
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CombinedSchema),
  });

  // mutation function for creating Product AD
  const { mutate: CreateProduct, isPending: ProdPending } = useMutation({
    mutationFn: createNewProduct,
    onSettled: (data: any) => {
      if (data.status === 200) {
        toast.success("Post Successfull");
        reset();
        router.push(`/productdetails/${data.product_id}`);
      }
      if (data.response.status === 422) {
        const errorArr: any[] = Object.values(data.response.data.errors);
        toast.error(errorArr[0]);
      }
      setPhoneDialog(false);
      setPhoneNumber("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // mutation function for sending Phone Number
  const { mutate: SendPhone, isPending: PhoneNumPending } = useMutation({
    mutationFn: sendPhoneNumber,
    onSuccess: () => {
      setPhoneNumber("");
      setPhoneDialog(false);
      setOtpDialog(true);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // mutation function for sending OTP
  const { mutate: SendOTP, isPending: OtpPending } = useMutation({
    mutationFn: sendOtp,
    onSettled: (data: any) => {
      setPhoneDialog(false);
      setPhoneNumber("");
      if (parseInt(data[0].split("=>")[1]) === 200) {
        handleCreateAppliance(getValues());
        setOtpDialog(false);
      }
      toast.error(data.response.data.response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // actual form submission function
  const onSubmit = async (data: any) => {
    if (files.length === 0) {
      return;
    } else {
      if (UserData?.verifiedStatus === 1) {
        handleCreateAppliance(getValues());
      } else {
        setPhoneDialog(true);
      }
    }
  };

  // for phone number submission
  const handlePhoneSubmit = () => {
    if (!phoneNumber) {
      alert("Please fill Phone Number");
    } else {
      SendPhone(phoneNumber);
    }
  };

  // for OTP Input BOXES Logic
  const handleOnOtpChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOtp: string[] = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOtp);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  // for OTP submission
  const handleOtpSubmit = () => {
    SendOTP(otp.join(""));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  // for mutation function
  async function handleCreateAppliance(data: any) {
    const actualData = {
      ...data,
      image_urls: files,
      user_id: UserData?.id,
      price: parseInt(data.price),
      category_id: params.slug[1],
    };
    CreateProduct(actualData);
  }

  useEffect(() => {
    if (files.length === 0) {
      setImgError("Image is required");
    }
    if (files.length > 0) {
      setImgError("");
    }
  }, [files]);

  if (isPending) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="mx-auto max-w-[1920px] px-2 md:px-10 xl:px-52 2xl:px-80">
      {/* Check if data is available before rendering the form */}
      {cateData && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col rounded-lg border-[1px] border-content"
        >
          <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 py-8 lg:px-10">
            <h3 className="font-semibold underline underline-offset-2">
              INCLUDE SOME DETAILS :
            </h3>

            <InputBox<TDynamicForm>
              name="pname"
              id="pname"
              placeholder="Enter Title..."
              register={register}
              error={(errors && errors?.pname?.message?.toString()) || ""}
              desc="Mention the key features of you item (e.g. brand, model, age,
                type)"
              label="Ad Title"
            />

            <TextareaBox<TDynamicForm>
              name="description"
              id="description"
              placeholder="Enter Description..."
              register={register}
              error={(errors && errors?.description?.message?.toString()) || ""}
              desc="Include condition, features and reason for selling"
              label="Description"
            />

            {apiFields &&
              Object.keys(apiFields).map((key) => {
                const newKey = formatCategory(key);

                return (
                  <div key={key}>
                    <Label>{newKey}</Label>
                    <Input
                      {...register(key)}
                      placeholder={`Enter ${newKey}`}
                      className={clsx("border-content py-6", {
                        "border-[2px] border-destructive placeholder:text-destructive":
                          errors[key]?.message?.toString() !== undefined,
                      })}
                    />
                    {errors[key] && (
                      <span className="pl-3 text-sm font-semibold text-destructive">
                        ** {errors[key]?.message?.toString()}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Price Section */}
          <PriceBox<TDynamicForm>
            name="price"
            id="price"
            register={register}
            error={(errors && errors?.price?.message?.toString()) || ""}
          />

          {/*Location selection Section */}
          <DynamicLocationBox<TDynamicForm>
            control={control as any}
            errors={errors}
          />

          {/* Photo Selection Section */}
          <FileUpload files={files} setFiles={setFiles} imgError={imgError} />

          {/* For OTP Dialog  */}
          <OtpDialog
            otp={otp}
            OtpPending={OtpPending}
            handleOtpSubmit={handleOtpSubmit}
            otpDialog={otpDialog}
            handleOnOtpChange={handleOnOtpChange}
            handleOnKeyDown={handleOnKeyDown}
            inputRef={inputRef}
            activeOTPIndex={activeOTPIndex}
            setOtpDialog={setOtpDialog}
          />

          {/* For Phone Number Dialog  */}
          <PhoneDialog
            PhoneNumPending={PhoneNumPending}
            handlePhoneSubmit={handlePhoneSubmit}
            phoneDialog={phoneDialog}
            setPhoneDialog={setPhoneDialog}
            setPhoneNumber={setPhoneNumber}
          />

          {/* Submitting Post Button */}
          <div className="px-3 py-8 lg:px-10">
            <Button type="submit" size="lg" className="w-fit text-lg">
              {ProdPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p>Posting..</p>
                </div>
              ) : (
                "Post now"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Page;
