"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { antiquesCollectiblesList, clothingAccessoryList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AntiquesSchema, ClothingSchema, TAntiques } from "@/types/postTypes";
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
import ClothingLocationBox from "../forms/components/locations/ClothingLocationBox";
import AntiquesLocationBox from "../forms/components/locations/AntiquesLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  ProductDetails: EAntiquesDetails;
  fnname: string;
}

export type OldImages = {
  id: number;
  image_url: string;
};

const EditAntiques: React.FC<EDetailsProps> = ({ ProductDetails, fnname }) => {
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
  } = useForm<TAntiques>({
    resolver: zodResolver(AntiquesSchema),
    defaultValues: {
      condition: ProductDetails.condition,
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      Municipality: ProductDetails.product.Municipality,
      pname: ProductDetails.product.pname,
      price: ProductDetails.product.price.toString(),
      Province: ProductDetails.product.Province,
      certification: ProductDetails.certification,
      era_period: ProductDetails.era_period,
      historical_significance: ProductDetails.historical_significance,
      material: ProductDetails.material,
      provenance_location: ProductDetails.provenance_location,
      rarity: ProductDetails.rarity,
      type_of_item: ProductDetails.type_of_item,
    },
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
      id: ProductDetails?.product.id,
      user_id: ProductDetails?.product.user_id,
      image_urls: files,
      old_image: oldImagesId,
      function_name: fnname,
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
          <AntiquesLocationBox
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

export default EditAntiques;
