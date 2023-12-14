"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { musicalInstrumentsList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MusicsSchema, TMusic } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewMusics, sendOtp, sendPhoneNumber } from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import RadioBox from "./components/RadioBox";
import MusicLocationBox from "./components/locations/MusicLocationBox";
import { useUserProfile } from "@/apis/queries";
import OtpDialog from "../dialogs/OtpDialog";
import PhoneDialog from "../dialogs/PhoneDialog";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Musics: React.FC = () => {
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
  } = useForm<TMusic>({
    resolver: zodResolver(MusicsSchema),
  });

  const typeofinstrument = musicalInstrumentsList.filter(
    (val) => val.name === "type"
  );
  const brands = musicalInstrumentsList.filter((val) => val.name === "brand");
  const conditions = musicalInstrumentsList.filter(
    (val) => val.name === "condition"
  );
  const materials = musicalInstrumentsList.filter(
    (val) => val.name === "material"
  );
  const soundcharacteristics = musicalInstrumentsList.filter(
    (val) => val.name === "sound_characteristics"
  );
  const assemblyarray = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewMusics,
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
  const onSubmit = async (data: TMusic) => {
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
  async function handleCreateAppliance(data: TMusic) {
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
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-52 2xl:px-80">
      <Title array={pathname.split("/")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        {/* Details Section */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
          </h3>

          <InputBox<TMusic>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TMusic>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TMusic>
              name="type_of_instrument"
              control={control}
              array={typeofinstrument[0]?.list}
              placeholder="Select Type of Instrument"
              label="Instruments:"
              error={errors.type_of_instrument?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TMusic>
              name="brand"
              control={control}
              array={brands[0]?.list}
              placeholder="Select Type of Band"
              label="Brands:"
              error={errors.brand?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TMusic>
              name="condition"
              control={control}
              array={conditions[0]?.list}
              placeholder="Select Type of condition"
              label="conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TMusic>
              name="material"
              control={control}
              array={materials[0]?.list}
              placeholder="Select Type of Material"
              label="Materials:"
              error={errors.material?.message || ""}
            />
          </div>

          <RadioBox<TMusic>
            array={assemblyarray}
            control={control}
            error={errors?.accessories_included?.message || ""}
            name="accessories_included"
            placeholder="Accessories Included:"
          />

          <div>
            <SelectBox<TMusic>
              name="sound_characteristics"
              control={control}
              array={soundcharacteristics[0]?.list}
              placeholder="Select Type of Sound Characteristics"
              label="Sound Characteristicss:"
              error={errors.sound_characteristics?.message || ""}
              extra="( Optional )"
            />
          </div>
        </div>

        {/* Price Section */}
        <PriceBox<TMusic>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <MusicLocationBox control={control} errors={errors} />

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
        <div className="px-10 py-8">
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

export default Musics;
