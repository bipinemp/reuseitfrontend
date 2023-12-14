"use client";

import { useEffect, useRef, useState } from "react";
import CarsData from "@/json/cars.json";
import CarSelectBox from "../CarSelectBox";
import { CarsSchema, TCars } from "@/types/postTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LabelRadio from "../LabelRadio";
import InputBox from "../InputBox";
import TextareaBox from "../TextareaBox";
import SelectBox from "../SelectBox";
import FileUpload from "../FileUpload";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCars, sendOtp, sendPhoneNumber } from "@/apis/apicalls";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import CarsLocationBox from "../locations/CarsLocationBox";
import PriceBox from "../PriceBox";
import { useUserProfile } from "@/apis/queries";
import OtpDialog from "@/components/categories/dialogs/OtpDialog";
import PhoneDialog from "@/components/categories/dialogs/PhoneDialog";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Cars: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const brands = CarsData.map((car) => car.brand);
  const [brand, setBrand] = useState("");
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
  } = useForm<TCars>({
    resolver: zodResolver(CarsSchema),
  });

  const models = CarsData.filter((car) => car.brand === brand)
    .map((car) => car.models)
    .flat();
  const fuels = ["CNG & Hybrids", "Diesel", "Electric", "LPG", "Petrol"];
  const tranmissions = ["Automatic", "Manual"];
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
    mutationFn: createNewCars,
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
      if (data.status === 200) {
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
  const onSubmit = async () => {
    if (files.length === 0) {
      return;
    } else {
      setPhoneDialog(true);
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
    index: number
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
  async function handleCreateAppliance(data: TCars) {
    const actualData = {
      ...data,
      image_urls: files,
      user_id: UserData?.id,
      price: parseInt(data.price),
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
    <div className="mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        {/* Details Section  */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 lg:px-10 py-8">
          <h3 className="font-semibold text-[0.95rem] sm:text-[1.17rem] underline underline-offset-2">
            INCLUDE SOME DETAILS (Cars) :
          </h3>

          <InputBox<TCars>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TCars>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <CarSelectBox<TCars>
            name="brand"
            control={control}
            array={brands}
            placeholder="Select Brand"
            label="All Brands:"
            error={errors?.brand?.message || ""}
            onChange={(val) => setBrand(val)}
          />

          {brand !== "" ? (
            <CarSelectBox<TCars>
              name="model"
              control={control}
              array={models}
              placeholder="Select model"
              label="All models:"
              error={errors?.model?.message || ""}
            />
          ) : null}

          <LabelRadio<TCars>
            array={fuels}
            control={control}
            name="fuel_type"
            error={errors?.fuel_type?.message || ""}
            placeholder="Fuel Type"
          />

          <LabelRadio<TCars>
            array={tranmissions}
            control={control}
            name="transmission_type"
            error={errors?.transmission_type?.message || ""}
            placeholder="Transmission Type"
          />

          <InputBox<TCars>
            name="km_driven"
            id="km_driven"
            type="number"
            placeholder="Enter KM Driven..."
            register={register}
            error={errors?.km_driven?.message || ""}
            desc="Mention the Total KM Driven"
            label="KM Driven"
          />

          <LabelRadio<TCars>
            array={owners}
            control={control}
            name="owner"
            error={errors?.owner?.message || ""}
            placeholder="No. of Owners"
          />

          <InputBox<TCars>
            name="year"
            id="year"
            placeholder="Enter Year..."
            register={register}
            error={errors?.year?.message || ""}
            desc="Mention which's year's model it is"
            label="Year"
            type="number"
          />

          <SelectBox<TCars>
            array={usedtimes}
            control={control}
            error={errors?.used_time?.message || ""}
            label="Times:"
            placeholder="Select Used Time"
            name="used_time"
          />

          <InputBox<TCars>
            name="mileage"
            id="mileage"
            placeholder="Enter Mileage..."
            register={register}
            error={errors?.mileage?.message || ""}
            desc="Mention KM / Miles"
            label="Mileage"
            type="number"
          />

          <SelectBox<TCars>
            array={conditions}
            control={control}
            error={errors?.condition?.message || ""}
            label="Conditions:"
            placeholder="Select Condition"
            name="condition"
          />

          <InputBox<TCars>
            name="color"
            id="color"
            placeholder="Enter Color..."
            register={register}
            error={errors?.color?.message || ""}
            desc="Mention the Color"
            label="Color"
          />
        </div>

        {/* Price Section */}
        <PriceBox<TCars>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <CarsLocationBox control={control} errors={errors} />

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
        <div className="px-3 lg:px-10 py-8">
          <Button type="submit" size="lg" className="text-lg w-fit">
            {isPending ? (
              <div className="flex gap-2 items-center">
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

export default Cars;
