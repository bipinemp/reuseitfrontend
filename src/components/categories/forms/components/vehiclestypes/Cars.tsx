"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
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
import { createNewAppliance } from "@/apis/apicalls";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import CarsLocationBox from "../locations/CarsLocationBox";
import PriceBox from "../PriceBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Cars: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const brands = CarsData.map((car) => car.brand);
  const [brand, setBrand] = useState("");

  const models = CarsData.filter((car) => car.brand === brand)
    .map((car) => car.models)
    .flat();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TCars>({
    resolver: zodResolver(CarsSchema),
  });

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
    mutationFn: createNewAppliance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Post Successfull");
      reset();
      router.push("/post");
    },
    // onSettled(data) {
    //   router.push(`/details/${data?.blog._id}`);
    // },
    onError: () => toast.error("Something went wrong try again"),
  });

  // actual form submission function
  const onSubmit = async (data: TCars) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TCars) {
    const actualData = {
      ...data,
      image_urls: files,
      user_id: 1,
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
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
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

export default Cars;
