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
import FileUpload from "./../forms/components/FileUpload";
import PriceBox from "./../forms/components/PriceBox";
import ElectronicsLocationBox from "./../forms/components/locations/ElectronicsLocationBox";
import { usePathname, useRouter } from "next/navigation";
import { createNewElectronics, updateProduct } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUserProfile } from "@/apis/queries";
import DashboardContainer from "@/components/DashboardContainer";
import { PiArrowLeftBold } from "react-icons/pi";
import Image from "next/image";
import axios from "axios";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  isPending: boolean;
  ProductDetails: EProductDetails;
}

const EditElectronic: React.FC<EDetailsProps> = ({
  ProductDetails,
  isPending: ProductDetailsPending,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const { data: UserData } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TElectronics>({
    resolver: zodResolver(ElectronicsSchema),
    defaultValues: {
      brand: ProductDetails.brand,
      condition: ProductDetails.condition,
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      // image_urls: ProductDetails.product.image,
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
    (val) => val.name === "condition"
  );
  const typeofwarrenty = electronicsList.filter(
    (val) => val.name === "warrenty"
  );

  // mutation function for creating Electronics AD
  const { mutate: updateElectronic, isPending } = useMutation({
    mutationFn: updateProduct,
    onSettled: (data: any) => {
      console.log(data);
      // if (data.status === 200) {
      //   toast.success("Post Successfull");
      //   reset();
      //   router.push(`/productdetails/${data.product_id}`);
      // }
      // if (data.response.status === 422) {
      //   const errorArr: any[] = Object.values(data.response.data.errors);
      //   toast.error(errorArr[0]);
      // }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // actual form submission function
  const onSubmit = async (data: any) => {
    // if (files.length === 0) {
    //   return;
    // }
    handleCreateElectronics(data);
  };

  //  mutation function for posting Product
  async function handleCreateElectronics(data: any) {
    const actualData = {
      ...data,
      price: parseInt(data.price),
      id: ProductDetails?.product_id,
      user_id: ProductDetails?.product.user_id,
    };

    updateElectronic(actualData);
  }

  //  for handling Image validation
  useEffect(() => {
    if (files.length === 0) {
      setImgError("Image is required");
    }
    if (files.length > 0) {
      setImgError("");
    }
  }, [files]);

  return (
    <DashboardContainer>
      <div className="w-[1000px] mx-auto flex flex-col gap-2 mb-20">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 py-3 px-5 bg-neutral-200 rounded-md w-fit cursor-pointer opacity-80 hover:opacity-100 transition">
            <PiArrowLeftBold size={25} />
          </div>
          <h2 className="font-semibold my-1 underline underline-offset-2">
            Edit Product
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border-[1px] border-content rounded-lg mb-10"
        >
          {/* Details Section */}
          <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 lg:px-10 py-8">
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
                label="Appliances:"
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
          <FileUpload files={files} setFiles={setFiles} imgError={imgError} />

          {/* <Image src={imgfile} width={100} height={100} alt="" /> */}

          {/* Submitting Product Sell Button */}
          <div className="px-3 lg:px-10 py-8">
            <Button type="submit" size="lg" className="text-lg w-fit">
              {isPending ? (
                <div className="flex gap-2 items-center">
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
