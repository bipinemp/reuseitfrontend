"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { furnitureList, toyGameList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TToys, ToysSchema } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewProduct,
  createNewToys,
  createOldProduct,
  sendOtp,
  sendPhoneNumber,
} from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import RadioBox from "./components/RadioBox";
import ToysLocationBox from "./components/locations/ToysLocationBox";
import { useUserProfile } from "@/apis/queries";
import OtpDialog from "../dialogs/OtpDialog";
import PhoneDialog from "../dialogs/PhoneDialog";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Toys: React.FC = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
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
  } = useForm<TToys>({
    resolver: zodResolver(ToysSchema),
  });

  const typeoftoy = toyGameList.filter((val) => val.name === "type");
  const brands = toyGameList.filter((val) => val.name === "brand");
  const agegroups = toyGameList.filter((val) => val.name === "age_group");
  const safetystandards = toyGameList.filter(
    (val) => val.name === "safety_information",
  );
  const typeofcondition = furnitureList.filter(
    (val) => val.name === "condition",
  );

  const assemblyarray = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];

  // mutation function for creating Home Appliance AD
  const { mutate: CreateProduct, isPending } = useMutation({
    mutationFn: createOldProduct,
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
  const onSubmit = async (data: TToys) => {
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  // for OTP submission
  const handleOtpSubmit = () => {
    SendOTP(otp.join(""));
  };

  // for mutation function
  async function handleCreateAppliance(data: TToys) {
    const actualData = {
      ...data,
      assembly_required: data.assembly_required === "true" ? 1 : 0,
      image_urls: files,
      user_id: UserData?.id,
      price: parseInt(data.price),
      fnname: pathname.split("/")[2],
    };
    CreateProduct(actualData);
  }
  fname: pathname.split("/")[2],
    useEffect(() => {
      if (files.length === 0) {
        setImgError("Image is required");
      }
      if (files.length > 0) {
        setImgError("");
      }
    }, [files]);

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

          <InputBox<TToys>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TToys>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TToys>
              name="type_of_toy_game"
              control={control}
              array={typeoftoy[0]?.list}
              placeholder="Select Type of Toys/Games"
              label="Toys/Games:"
              error={errors.type_of_toy_game?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TToys>
              name="age_group"
              control={control}
              array={agegroups[0]?.list}
              placeholder="Select the Age-Group"
              label="Age-Groups:"
              error={errors.age_group?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TToys>
              name="brand"
              control={control}
              array={brands[0]?.list}
              placeholder="Select the Brand"
              label="Brands:"
              error={errors.brand?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TToys>
              name="condition"
              control={control}
              array={typeofcondition[0]?.list}
              placeholder="Select Type of condition"
              label="conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TToys>
              name="safety_information"
              control={control}
              array={safetystandards[0]?.list}
              placeholder="Select Safety Standard"
              label="Safety Standards:"
              error={errors.safety_information?.message || ""}
            />
          </div>

          <RadioBox<TToys>
            array={assemblyarray}
            control={control}
            error={errors?.assembly_required?.message || ""}
            name="assembly_required"
            placeholder="Assembly Required:"
          />

          <TextareaBox<TToys>
            name="recommended_use"
            id="recommended_use"
            placeholder="Enter Recommendation..."
            register={register}
            error={errors?.recommended_use?.message || ""}
            desc="Include how to use the Toys/Games"
            label="Recommendation"
          />
        </div>

        {/* Price Section */}
        <PriceBox<TToys>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <ToysLocationBox control={control} errors={errors} />

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

export default Toys;
