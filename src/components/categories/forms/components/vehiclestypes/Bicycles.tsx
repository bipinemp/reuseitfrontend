"use client";

import { useEffect, useRef, useState } from "react";
import CarSelectBox from "../CarSelectBox";
import { BicycleSchema, TBicycles } from "@/types/postTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "../InputBox";
import TextareaBox from "../TextareaBox";
import FileUpload from "../FileUpload";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOldProduct, sendOtp, sendPhoneNumber } from "@/apis/apicalls";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PriceBox from "../PriceBox";
import ScooterData from "@/json/scooter.json";
import BicyclesLocationBox from "../locations/BicyclesLocationBox";
import { useUserProfile } from "@/apis/queries";
import OtpDialog from "@/components/categories/dialogs/OtpDialog";
import PhoneDialog from "@/components/categories/dialogs/PhoneDialog";
import Title from "../Title";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Bicycles: React.FC = () => {
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
  } = useForm<TBicycles>({
    resolver: zodResolver(BicycleSchema),
  });

  const brands = ScooterData.Scooters.map((scooter) => scooter.brand);

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
  const onSubmit = async (data: TBicycles) => {
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
  async function handleCreateAppliance(data: TBicycles) {
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
            INCLUDE SOME DETAILS (Bicycles) :
          </h3>

          <InputBox<TBicycles>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TBicycles>
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
          />
        </div>

        {/* Price Section */}
        <PriceBox<TBicycles>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <BicyclesLocationBox control={control} errors={errors} />

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

export default Bicycles;
