"use client";

import { useEffect, useState } from "react";
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
import { createNewScooters } from "@/apis/apicalls";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PriceBox from "../PriceBox";
import ScooterData from "@/json/scooter.json";
import BikesLocationBox from "../locations/BikesLocationBox";
import { useUserProfile } from "@/apis/queries";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Scooters: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const { data: UserData } = useUserProfile();

  const brands = ScooterData.Scooters.map((scooter) => scooter.brand);
  const [brand, setBrand] = useState("");

  const models = ScooterData.Scooters.filter(
    (scooter) => scooter.brand === brand
  )
    .map((scooter) => scooter.models)
    .flat();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TBikes>({
    resolver: zodResolver(BikesSchema),
  });

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
    mutationFn: createNewScooters,
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // actual form submission function
  const onSubmit = async (data: TBikes) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TBikes) {
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
          <h3 className="font-semibold text-[0.85rem] sm:text-[1.17rem] underline underline-offset-2">
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

export default Scooters;
