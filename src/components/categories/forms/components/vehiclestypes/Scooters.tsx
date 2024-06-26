"use client";

import { useEffect, useRef, useState } from "react";
import CarSelectBox from "../CarSelectBox";
import { BikesSchema, TBikes } from "@/types/postTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LabelRadio from "../LabelRadio";
import InputBox from "../InputBox";
import TextareaBox from "../TextareaBox";
import SelectBox from "../SelectBox";
import FileUpload from "../FileUpload";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOldProduct, sendOtp, sendPhoneNumber } from "@/apis/apicalls";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PriceBox from "../PriceBox";
import ScooterData from "@/json/scooter.json";
import BikesLocationBox from "../locations/BikesLocationBox";
import { useUserProfile } from "@/apis/queries";
import OtpDialog from "@/components/categories/dialogs/OtpDialog";
import PhoneDialog from "@/components/categories/dialogs/PhoneDialog";
import Title from "../Title";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Scooters: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const { data: UserData } = useUserProfile();
  const [brand, setBrand] = useState("");

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
  } = useForm<TBikes>({
    resolver: zodResolver(BikesSchema),
  });

  const brands = ScooterData.Scooters.map((scooter) => scooter.brand);
  const models = ScooterData.Scooters.filter(
    (scooter) => scooter.brand === brand,
  )
    .map((scooter) => scooter.models)
    .flat();

  const owners = ["1st", "2nd", "3rd", "4th", "4+"];
  const usedtimes = [
    "1 Year",
    "2 Year",
    "3 Year",
    "4 Year",
    "5 Year",
    "5+ Years",
  ];
  const conditions = [
    "Brand New (never used)",
    "Like New (gently used with minimal signs of wear)",
    "Good (used with some signs of wear but functions well)",
    "Fair (visible wear and tear but still functional)",
    "Poor (may require repairs or refurbishment)",
  ];

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
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
  const onSubmit = async (data: TBikes) => {
    if (UserData?.isBlocked === 1) {
      toast.error("Sorry, Your are currently Blocked By Website Admin");
    } else {
      if (files.length === 0) {
        return;
      } else {
        if (UserData?.verifiedStatus === 1) {
          handleCreateAppliance(getValues());
        } else {
          setPhoneDialog(true);
        }
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
  async function handleCreateAppliance(data: TBikes) {
    const actualData = {
      ...data,
      image_urls: files,
      user_id: UserData?.id,
      price: parseInt(data.price),
      fnname: pathname.split("/")[2],
    };
    CreateBlog(actualData);
  }

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
        {/* Details Section  */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 py-8 lg:px-10">
          <h3 className="text-[0.85rem] font-semibold underline underline-offset-2 sm:text-[1.17rem]">
            INCLUDE SOME DETAILS (Scooters) :
          </h3>

          <InputBox<TBikes>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TBikes>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <CarSelectBox
            name="brand"
            control={control}
            array={brands}
            placeholder="Select Brand"
            label="All Brands"
            error={errors?.brand?.message || ""}
            onChange={(val) => setBrand(val)}
          />

          {brand !== "" ? (
            <CarSelectBox<TBikes>
              name="model"
              control={control}
              array={models}
              placeholder="Select model"
              label="All models:"
              error={errors?.model?.message || ""}
            />
          ) : null}

          <InputBox<TBikes>
            name="year"
            id="year"
            placeholder="Enter Year..."
            register={register}
            error={errors?.year?.message || ""}
            desc="Mention which's year's model it is"
            label="Year"
            type="number"
          />

          <InputBox<TBikes>
            name="mileage"
            id="mileage"
            placeholder="Enter Mileage..."
            register={register}
            error={errors?.mileage?.message || ""}
            desc="Mention KM / Miles"
            label="Mileage"
            type="number"
          />

          <SelectBox<TBikes>
            array={conditions}
            control={control}
            error={errors?.condition?.message || ""}
            label="Conditions:"
            placeholder="Select Condition"
            name="condition"
          />

          <InputBox<TBikes>
            name="km_driven"
            id="km_driven"
            type="number"
            placeholder="Enter KM Driven..."
            register={register}
            error={errors?.km_driven?.message || ""}
            desc="Mention the Total KM Driven"
            label="KM Driven"
          />

          <InputBox<TBikes>
            name="color"
            id="color"
            placeholder="Enter Color..."
            register={register}
            error={errors?.color?.message || ""}
            desc="Mention the Color"
            label="Color"
          />

          <LabelRadio<TBikes>
            array={owners}
            control={control}
            name="owner"
            error={errors?.owner?.message || ""}
            placeholder="No. of Owners"
          />

          <SelectBox<TBikes>
            array={usedtimes}
            control={control}
            error={errors?.used_time?.message || ""}
            label="Times:"
            placeholder="Select Used Time"
            name="used_time"
          />
        </div>

        {/* Price Section */}
        <PriceBox<TBikes>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <BikesLocationBox control={control} errors={errors} />

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

export default Scooters;
