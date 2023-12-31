"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { antiquesCollectiblesList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AntiquesSchema, TAntiques } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOldProduct, sendOtp, sendPhoneNumber } from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import AntiquesLocationBox from "./components/locations/AntiquesLocationBox";
import { useUserProfile } from "@/apis/queries";
import OtpDialog from "../dialogs/OtpDialog";
import PhoneDialog from "../dialogs/PhoneDialog";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

let currentOTPIndex: number = 0;
const Antiques: React.FC = () => {
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
  } = useForm<TAntiques>({
    resolver: zodResolver(AntiquesSchema),
  });

  const typeofantiques = antiquesCollectiblesList.filter(
    (val) => val.name === "type",
  );
  const eraperiods = antiquesCollectiblesList.filter(
    (val) => val.name === "era_period",
  );
  const materials = antiquesCollectiblesList.filter(
    (val) => val.name === "material",
  );
  const conditions = antiquesCollectiblesList.filter(
    (val) => val.name === "condition",
  );
  const locations = antiquesCollectiblesList.filter(
    (val) => val.name === "provenance_location",
  );
  const rarities = antiquesCollectiblesList.filter(
    (val) => val.name === "rarity",
  );
  const histories = antiquesCollectiblesList.filter(
    (val) => val.name === "historical_significance",
  );

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
  const onSubmit = async (data: TAntiques) => {
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
  async function handleCreateAppliance(data: TAntiques) {
    const actualData = {
      ...data,
      image_urls: files,
      user_id: UserData?.id,
      path: pathname.split("/")[2],
      price: parseInt(data.price),
      fnname: pathname.split("/")[2],
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

          <InputBox<TAntiques>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TAntiques>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TAntiques>
              name="type_of_item"
              control={control}
              array={typeofantiques[0]?.list}
              placeholder="Select Type of Antique/Collectible"
              label="Antiques/Collectibles:"
              error={errors.type_of_item?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TAntiques>
              name="era_period"
              control={control}
              array={eraperiods[0]?.list}
              placeholder="Select the Era/Period"
              label="Eras/Periods:"
              error={errors.era_period?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TAntiques>
              name="material"
              control={control}
              array={materials[0]?.list}
              placeholder="Select the material"
              label="materials:"
              error={errors.material?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TAntiques>
              name="condition"
              control={control}
              array={conditions[0]?.list}
              placeholder="Select Type of condition"
              label="conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TAntiques>
              name="provenance_location"
              control={control}
              array={locations[0]?.list}
              placeholder="Select the Provenance Locations"
              label="Locations:"
              error={errors.provenance_location?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TAntiques>
              name="rarity"
              control={control}
              array={rarities[0]?.list}
              placeholder="Select the Rarity"
              label="Rarities:"
              error={errors.rarity?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TAntiques>
              name="historical_significance"
              control={control}
              array={histories[0]?.list}
              placeholder="Select the Historical Significance"
              label="Historical Significance:"
              error={errors.historical_significance?.message || ""}
            />
          </div>

          <InputBox<TAntiques>
            name="certification"
            id="certification"
            placeholder="Enter Certification..."
            register={register}
            error={errors?.certification?.message || ""}
            desc="Mention Certification if available"
            label="Certification ( Optional )"
          />
        </div>

        {/* Price Section */}
        <PriceBox<TAntiques>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <AntiquesLocationBox control={control} errors={errors} />

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

export default Antiques;
