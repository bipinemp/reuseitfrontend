"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { electronicsList, furnitureList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ElectronicsSchema,
  FurnitureSchema,
  TFurnitures,
} from "@/types/postTypes";
import InputBox from "./../forms/components/InputBox";
import TextareaBox from "./../forms/components/TextareaBox";
import SelectBox from "./../forms/components/SelectBox";
import PriceBox from "./../forms/components/PriceBox";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import DashboardContainer from "@/components/DashboardContainer";
import { PiArrowLeftBold } from "react-icons/pi";
import UpdateFileUpload from "../forms/components/UpdateFileUpload";
import toast from "react-hot-toast";
import RadioBox from "../forms/components/RadioBox";
import FurnitureLocationBox from "../forms/components/locations/FurnitureLocation";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  ProductDetails: EFurnitureDetails;
  fnname: string;
}

export type OldImages = {
  id: number;
  image_url: string;
};

const EditFurniture: React.FC<EDetailsProps> = ({ ProductDetails, fnname }) => {
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
  } = useForm<TFurnitures>({
    resolver: zodResolver(FurnitureSchema),
    defaultValues: {
      condition: ProductDetails.condition,
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      Municipality: ProductDetails.product.Municipality,
      pname: ProductDetails.product.pname,
      price: ProductDetails.product.price.toString(),
      Province: ProductDetails.product.Province,
      assembly_required:
        parseInt(ProductDetails.assembly_required) === 1 ? "true" : "false",
      dimensions: ProductDetails.dimensions,
      material: ProductDetails.material,
      style: ProductDetails.style,
      type_of_furniture: ProductDetails.type_of_furniture,
      color: ProductDetails.color,
    },
  });

  const typeoffurniture = furnitureList.filter((val) => val.name === "type");
  const typeofcondition = furnitureList.filter(
    (val) => val.name === "condition",
  );
  const material = furnitureList.filter((val) => val.name === "material");
  const style = furnitureList.filter((val) => val.name === "style");
  const color = furnitureList.filter((val) => val.name === "color");
  const assemblyarray = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];

  // mutation function for creating Electronics AD
  const { mutate: updateElectronic, isPending } = useMutation({
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
    handleCreateElectronics(data);
  };

  //  mutation function for posting Product
  async function handleCreateElectronics(data: any) {
    const actualData = {
      ...data,
      price: parseInt(data.price),
      id: ProductDetails?.product.id,
      user_id: ProductDetails?.product.user_id,
      image_urls: files,
      old_image: oldImagesId,
      function_name: fnname,
      assembly_required: data.assembly_required === "true" ? 1 : 0,
    };
    updateElectronic(actualData);
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

            <InputBox<TFurnitures>
              name="pname"
              id="pname"
              placeholder="Enter Title..."
              register={register}
              error={errors?.pname?.message || ""}
              desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
              label="Ad Title"
            />

            <TextareaBox<TFurnitures>
              name="description"
              id="description"
              placeholder="Enter Description..."
              register={register}
              error={errors?.description?.message || ""}
              desc="Include condition, features and reason for selling"
              label="Description"
            />

            <div>
              <SelectBox<TFurnitures>
                name="type_of_furniture"
                control={control}
                array={typeoffurniture[0]?.list}
                placeholder="Select Type of Furniture"
                label="Furnitures:"
                error={errors.type_of_furniture?.message || ""}
              />
            </div>

            <div>
              <SelectBox<TFurnitures>
                name="material"
                control={control}
                array={material[0]?.list}
                placeholder="Select Type of Material"
                label="Materials:"
                error={errors.material?.message || ""}
              />
            </div>

            <InputBox<TFurnitures>
              id="dimensions"
              name="dimensions"
              placeholder="Enter Dimensions of Furniture..."
              error={errors?.dimensions?.message || ""}
              desc="Enter the proper Dimensions of ( 10x20x30 ) format"
              register={register}
              label="Dimensions"
            />

            <div>
              <SelectBox<TFurnitures>
                name="color"
                control={control}
                array={color[0]?.list}
                placeholder="Select Type of color"
                label="colors:"
                error={errors.color?.message || ""}
              />
            </div>

            <div>
              <SelectBox<TFurnitures>
                name="style"
                control={control}
                array={style[0]?.list}
                placeholder="Select Type of style"
                label="styles:"
                error={errors.style?.message || ""}
              />
            </div>

            <div>
              <SelectBox<TFurnitures>
                name="condition"
                control={control}
                array={typeofcondition[0]?.list}
                placeholder="Select Type of condition"
                label="conditions:"
                error={errors.condition?.message || ""}
              />
            </div>

            <RadioBox<TFurnitures>
              array={assemblyarray}
              control={control}
              error={errors?.assembly_required?.message || ""}
              name="assembly_required"
              placeholder="Assembly Required:"
            />
          </div>

          {/* Price Section */}
          <PriceBox<TFurnitures>
            name="price"
            id="price"
            register={register}
            error={errors?.price?.message || ""}
          />

          {/*Location selection Section */}
          <FurnitureLocationBox
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

export default EditFurniture;
