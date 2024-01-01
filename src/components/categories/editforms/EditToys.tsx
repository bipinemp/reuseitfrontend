"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { furnitureList, toyGameList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TToys, ToysSchema } from "@/types/postTypes";
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
import BooksLocationBox from "../forms/components/locations/BooksLocationBox";
import RadioBox from "../forms/components/RadioBox";
import ToysLocationBox from "../forms/components/locations/ToysLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  ProductDetails: EToysDetails;
  fnname: string;
}

export type OldImages = {
  id: number;
  image_url: string;
};

const EdiTToys: React.FC<EDetailsProps> = ({ ProductDetails, fnname }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const [oldImages, setOldImages] = useState<OldImages[] | []>(
    ProductDetails?.product.image ?? [],
  );
  const [oldImagesId, setOldImagesId] = useState<number[] | []>([]);
  console.log(ProductDetails);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TToys>({
    resolver: zodResolver(ToysSchema),
    defaultValues: {
      condition: ProductDetails.condition,
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      Municipality: ProductDetails.product.Municipality,
      pname: ProductDetails.product.pname,
      price: ProductDetails.product.price.toString(),
      Province: ProductDetails.product.Province,
      age_group: ProductDetails.age_group,
      assembly_required:
        parseInt(ProductDetails.assembly_required) === 1 ? "true" : "false",
      brand: ProductDetails.brand,
      recommended_use: ProductDetails.recommended_use,
      safety_information: ProductDetails.safety_information,
      type_of_toy_game: ProductDetails.type_of_toy_game,
    },
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

  // mutation function for creating Electronics AD
  const { mutate: updateClothing, isPending } = useMutation({
    mutationFn: updateProduct,
    onSettled: (data: any) => {
      if (data.success === "Successful Update") {
        toast.success("Update Successfull");
        reset();
        router.push(`/productdetails/${ProductDetails?.product_id}`);
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
    handleCreateClothing(data);
  };

  //  mutation function for posting Product
  async function handleCreateClothing(data: any) {
    const actualData = {
      ...data,
      price: parseInt(data.price),
      id: ProductDetails?.product_id,
      user_id: ProductDetails?.product.user_id,
      image_urls: files,
      old_image: oldImagesId,
      function_name: fnname,
      assembly_required: data.assembly_required === "true" ? 1 : 0,
    };
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
          <ToysLocationBox
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

export default EdiTToys;
