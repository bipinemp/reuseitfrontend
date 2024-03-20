"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { electronicsList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElectronicsSchema, TElectronics } from "@/types/postTypes";
import InputBox from "./../forms/components/InputBox";
import TextareaBox from "./../forms/components/TextareaBox";
import SelectBox from "./../forms/components/SelectBox";
import PriceBox from "./../forms/components/PriceBox";
import ElectronicsLocationBox from "./../forms/components/locations/ElectronicsLocationBox";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import DashboardContainer from "@/components/DashboardContainer";
import { PiArrowLeftBold } from "react-icons/pi";
import UpdateFileUpload from "../forms/components/UpdateFileUpload";
import toast from "react-hot-toast";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  ProductDetails: EProductDetails;
  fnname: string;
}

export type OldImages = {
  id: number;
  image_url: string;
};

const EditElectronic: React.FC<EDetailsProps> = ({
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
  } = useForm<TElectronics>({
    resolver: zodResolver(ElectronicsSchema),
    defaultValues: {
      brand: ProductDetails.brand,
      condition: ProductDetails.condition,
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      model: ProductDetails.model,
      Municipality: ProductDetails.product.Municipality,
      pname: ProductDetails.product.pname,
      price: ProductDetails.product.price.toString(),
      Province: ProductDetails.product.Province,
      type_of_electronic: ProductDetails.type_of_electronic,
      warranty_information: ProductDetails.warranty_information,
    },
  });

  const typeofelectronic = electronicsList.filter((val) => val.name === "type");
  const typeofcondition = electronicsList.filter(
    (val) => val.name === "condition",
  );
  const typeofwarrenty = electronicsList.filter(
    (val) => val.name === "warrenty",
  );

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

            <InputBox<TElectronics>
              name="pname"
              id="pname"
              placeholder="Enter Title..."
              register={register}
              error={errors?.pname?.message || ""}
              desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
              label="Ad Title"
            />

            <TextareaBox<TElectronics>
              name="description"
              id="description"
              placeholder="Enter Description..."
              register={register}
              error={errors?.description?.message || ""}
              desc="Include condition, features and reason for selling"
              label="Description"
            />

            <div>
              <SelectBox<TElectronics>
                name="type_of_electronic"
                control={control}
                array={typeofelectronic[0].list}
                placeholder="Select Type of Electronic"
                label="Electronics:"
                error={errors.type_of_electronic?.message || ""}
              />
            </div>

            <InputBox<TElectronics>
              id="brand"
              name="brand"
              placeholder="Enter Brand Name..."
              error={errors?.brand?.message || ""}
              desc="Enter the name of the Brand"
              register={register}
              label="Brand"
            />

            <InputBox<TElectronics>
              id="model"
              name="model"
              placeholder="Enter Model Name..."
              error={errors?.model?.message || ""}
              desc="Enter the name of the Model"
              register={register}
              label="Model"
            />

            <div>
              <SelectBox<TElectronics>
                name="condition"
                control={control}
                array={typeofcondition[0]?.list}
                placeholder="Select Condition"
                label="Conditions:"
                error={errors.condition?.message || ""}
              />
            </div>

            <div>
              <SelectBox<TElectronics>
                name="warranty_information"
                control={control}
                array={typeofwarrenty[0]?.list}
                placeholder="Select the Warranty"
                label="Available Warrenties:"
                error={errors?.warranty_information?.message || ""}
              />
            </div>
          </div>

          {/* Price Section */}
          <PriceBox<TElectronics>
            name="price"
            id="price"
            register={register}
            error={errors?.price?.message || ""}
          />

          {/*Location selection Section */}
          <ElectronicsLocationBox
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

export default EditElectronic;
