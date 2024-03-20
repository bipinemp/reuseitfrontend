"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import BikesBrands from "@/json/bikesbrands.json";
import BikesModels from "@/json/bikesmodels.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { BikesSchema, TBikes } from "@/types/postTypes";
import InputBox from "./../forms/components/InputBox";
import TextareaBox from "./../forms/components/TextareaBox";
import PriceBox from "./../forms/components/PriceBox";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import DashboardContainer from "@/components/DashboardContainer";
import { PiArrowLeftBold } from "react-icons/pi";
import UpdateFileUpload from "../forms/components/UpdateFileUpload";
import toast from "react-hot-toast";
import CarSelectBox from "../forms/components/CarSelectBox";
import BikeSelectBox from "../forms/components/BikeSelectBox";
import SelectBox from "../forms/components/SelectBox";
import LabelRadio from "../forms/components/LabelRadio";
import BikesLocationBox from "../forms/components/locations/BikesLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  ProductDetails: EBikesScootersDetails;
  fnname: string;
}

export type OldImages = {
  id: number;
  image_url: string;
};

const EditMotorcycles: React.FC<EDetailsProps> = ({
  ProductDetails,
  fnname,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const [oldImages, setOldImages] = useState<OldImages[] | []>(
    ProductDetails?.product.image ?? [],
  );
  const [oldImagesId, setOldImagesId] = useState<number[] | []>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TBikes>({
    resolver: zodResolver(BikesSchema),
    defaultValues: {
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      Municipality: ProductDetails.product.Municipality,
      pname: ProductDetails.product.pname,
      price: ProductDetails.product.price.toString(),
      Province: ProductDetails.product.Province,
      brand: ProductDetails.brand.toString(),
      color: ProductDetails.color,
      condition: ProductDetails.condition,
      km_driven: ProductDetails.km_driven.toString(),
      mileage: ProductDetails.mileage.toString(),
      model: ProductDetails.model.toString(),
      owner: ProductDetails.owner,
      used_time: ProductDetails.used_time,
      year: ProductDetails.year.toString(),
    },
  });

  const brands = BikesBrands.data.map((bike) => bike);

  const defaultBrand = brands.find(
    (bike) => bike.name === ProductDetails.brand,
  );

  const defaultId = brands.findLast(
    (bike) => bike.id.toString() === defaultBrand?.id.toString(),
  );

  const [brandId, setBrandId] = useState<number>(defaultId?.id || 0);
  const modelsDetails = BikesModels.data.filter(
    (bike) => bike.brand_id === brandId,
  );

  const models = modelsDetails.map((bike) => bike.name);

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

  // mutation function for creating Electronics AD
  const { mutate: updateClothing, isPending } = useMutation({
    mutationFn: updateProduct,
    onSettled: (data: any) => {
      if (data.success === "Successful Update") {
        toast.success("Update Successfull");
        reset();
        router.push(`/productdetails/${ProductDetails?.product.id}`);
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
  const onSubmit = async (data: any) => {
    if (files.length === 0 && oldImages.length === 0) {
      return;
    }
    console.log(data);
    handleCreateClothing(data);
  };

  //  mutation function for posting Product
  async function handleCreateClothing(data: any) {
    const actualData = {
      ...data,
      price: parseInt(data.price),
      id: ProductDetails?.product.id,
      user_id: ProductDetails?.product.user_id,
      image_urls: files,
      old_image: oldImagesId,
      function_name: fnname,
    };
    console.log(actualData);
    updateClothing(actualData);
  }

  //  for handling Image validation
  useEffect(() => {
    if (oldImages.length === 0 && files.length === 0) {
      setImgError("Image is required");
    } else {
      setImgError("");
    }
  }, [oldImages, files]);

  return (
    <DashboardContainer>
      <div className="mx-auto mb-20 flex w-[1000px] flex-col gap-2">
        <div className="flex items-center gap-5">
          <div className="flex w-fit cursor-pointer items-center gap-1 rounded-md bg-neutral-200 px-5 py-3 opacity-80 transition hover:opacity-100">
            <PiArrowLeftBold size={25} />
          </div>
          <h2 className="my-1 font-semibold underline underline-offset-2">
            Edit Product
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col rounded-lg border-[1px] border-content"
        >
          {/* Details Section */}
          <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 py-8 lg:px-10">
            <h3 className="font-semibold underline underline-offset-2">
              INCLUDE SOME DETAILS :
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

            <BikeSelectBox
              name="brand"
              control={control}
              array={brands}
              placeholder="Select Brand"
              label="All Brands"
              error={errors?.brand?.message || ""}
              onChange={(val) => setBrandId(val)}
            />

            <CarSelectBox<TBikes>
              name="model"
              control={control}
              array={models}
              placeholder="Select model"
              label="All models:"
              error={errors?.model?.message || ""}
            />

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
          <BikesLocationBox
            control={control}
            errors={errors}
            whileEditing={true}
            Prov={ProductDetails?.product?.Province || ""}
            Dist={ProductDetails?.product?.District || ""}
          />

          {/* Photo Selection Section */}
          <UpdateFileUpload
            files={files}
            setFiles={setFiles}
            imgError={imgError}
            oldImages={oldImages}
            totalImgCount={oldImages.length}
            setOldImages={setOldImages}
            setOldImagesId={setOldImagesId}
          />

          {/* Submitting Product Sell Button */}
          <div className="px-3 py-8 lg:px-10">
            <Button type="submit" size="lg" className="w-fit text-lg">
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p>Updating..</p>
                </div>
              ) : (
                "Update now"
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardContainer>
  );
};

export default EditMotorcycles;
