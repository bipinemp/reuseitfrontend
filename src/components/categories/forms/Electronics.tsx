"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { electronicsList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElectronicsSchema, TElectronics } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import ElectronicsLocationBox from "./components/locations/ElectronicsLocationBox";
import { usePathname, useRouter } from "next/navigation";
import Title from "./components/Title";
import {
  createNewElectronics,
  createNewProduct,
  sendOtp,
  sendPhoneNumber,
} from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUserProfile } from "@/apis/queries";
import PhoneDialog from "../dialogs/PhoneDialog";
import OtpDialog from "../dialogs/OtpDialog";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Electronics: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const { data: UserData } = useUserProfile();

  const [phoneDialog, setPhoneDialog] = useState<boolean>(false);
  const [otpDialog, setOtpDialog] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // for OTP
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TElectronics>({
    resolver: zodResolver(ElectronicsSchema),
  });

  const typeofelectronic = electronicsList.filter((val) => val.name === "type");
  const typeofcondition = electronicsList.filter(
    (val) => val.name === "condition",
  );
  const typeofwarrenty = electronicsList.filter(
    (val) => val.name === "warrenty",
  );

  // mutation function for creating Electronics AD
  const { mutate: CreateProduct, isPending } = useMutation({
    mutationFn: createNewElectronics,
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
        handleCreateElectronics(getValues());
        setOtpDialog(false);
      }
      toast.error(data.response.data.response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // actual form submission function
  const onSubmit = async () => {
    if (files.length === 0) {
      return;
    } else {
      if (UserData?.verifiedStatus === 1) {
        handleCreateElectronics(getValues());
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  // for OTP submission
  const handleOtpSubmit = () => {
    SendOTP(otp.join(""));
  };

  //  mutation function for posting Product
  async function handleCreateElectronics(data: any) {
    const actualData = {
      ...data,
      image_urls: files,
      user_id: UserData?.id,
      price: parseInt(data.price),
      path: pathname.split("/")[2],
    };
    CreateProduct(actualData);
  }

  //  for handling Image validation
  useEffect(() => {
    if (files.length === 0) {
      setImgError("Image is required");
    }
    if (files.length > 0) {
      setImgError("");
    }
  }, [files]);

  console.log(pathname);

  return (
    <div className="mx-auto max-w-[1920px] px-2 md:px-10 xl:px-52 2xl:px-80">
      <Title array={pathname.split("/")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-10 flex flex-col rounded-lg border-[1px] border-content"
      >
        {/* Details Section */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 py-8 lg:px-10">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
          </h3>

          <InputBox<TElectronics>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TElectronics>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TElectronics>
              name="type_of_electronic"
              control={control}
              array={typeofelectronic[0].list}
              placeholder="Select Type of Electronic"
              label="Appliances:"
              error={errors.type_of_electronic?.message || ""}
            />
          </div>

          <InputBox<TElectronics>
            id="brand"
            name="brand"
            placeholder="Enter Brand Name..."
            error={errors?.brand?.message || ""}
            desc="Enter the name of the Brand"
            register={register}
            label="Brand"
          />

          <InputBox<TElectronics>
            id="model"
            name="model"
            placeholder="Enter Model Name..."
            error={errors?.model?.message || ""}
            desc="Enter the name of the Model"
            register={register}
            label="Model"
          />

          <div>
            <SelectBox<TElectronics>
              name="condition"
              control={control}
              array={typeofcondition[0]?.list}
              placeholder="Select Condition"
              label="Conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TElectronics>
              name="warranty_information"
              control={control}
              array={typeofwarrenty[0]?.list}
              placeholder="Select the Warranty"
              label="Available Warrenties:"
              error={errors?.warranty_information?.message || ""}
            />
          </div>
        </div>

        {/* Price Section */}
        <PriceBox<TElectronics>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <ElectronicsLocationBox control={control} errors={errors} />

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

        {/* Submitting Product Sell Button */}
        <div className="px-3 py-8 lg:px-10">
          <Button type="submit" size="lg" className="w-fit text-lg">
            {isPending ? (
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
    </div>
  );
};

export default Electronics;
