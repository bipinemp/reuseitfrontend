"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TDynamicForm, DynamicFormSchema } from "@/types/postTypes";
import InputBox from "./../forms/components/InputBox";
import TextareaBox from "./../forms/components/TextareaBox";
import PriceBox from "./../forms/components/PriceBox";
import { useRouter } from "next/navigation";
import { updateDynamicProduct, updateProduct } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import DashboardContainer from "@/components/DashboardContainer";
import { PiArrowLeftBold } from "react-icons/pi";
import UpdateFileUpload from "../forms/components/UpdateFileUpload";
import toast from "react-hot-toast";
import { useCategoryDetails } from "@/apis/queries";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import DynamicLocationBox from "../forms/components/locations/DynamicLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  ProductDetails: EDynamicFormDetails;
  fnname: string;
  catId: number;
}

export type OldImages = {
  id: number;
  image_url: string;
};

interface EditObj {
  data: any[];
  //     [key: string]: string; // Add an index signature for string keys
  //   };
}

const EditDynamic: React.FC<EDetailsProps> = ({
  ProductDetails,
  fnname,
  catId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const { data: cateData, isPending } = useCategoryDetails(catId);
  const [oldImages, setOldImages] = useState<OldImages[] | []>(
    ProductDetails?.product.image ?? [],
  );
  const [oldImagesId, setOldImagesId] = useState<number[] | []>([]);

  const editObj: EditObj = {
    data: ProductDetails.fields as any,
  };

  //   console.log(ProductDetails);
  //   console.log(editObj);
  function formatCategory(inputString: string) {
    // Split the input string by underscores
    var parts = inputString.split("_");

    // Capitalize the first letter of each part
    for (var i = 0; i < parts.length; i++) {
      parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
    }

    // Join the parts back together without underscores
    var formattedString = parts.join(" ");

    return formattedString;
  }

  // Assuming `fields` is the array you get from the API
  const apiFields = cateData?.fields?.reduce(
    (acc: Record<string, any>, field: any) => {
      acc[field.name] = z
        .string()
        .min(1, { message: `You must enter a ${field.name}` });
      return acc;
    },
    {},
  );

  // Combine your existing schema with the new fields
  const CombinedSchema = z.object({
    ...DynamicFormSchema.shape,
    ...apiFields,
  });

  type TSchema = z.infer<typeof CombinedSchema>;

  // Use the combined schema in your form
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TSchema>({
    resolver: zodResolver(CombinedSchema),
    defaultValues: {
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      Municipality: ProductDetails.product.Municipality,
      pname: ProductDetails.product.pname,
      price: ProductDetails.product.price.toString(),
      Province: ProductDetails.product.Province,
    },
  });

  // mutation function for creating Electronics AD
  const { mutate: updateAppliance, isPending: Updating } = useMutation({
    mutationFn: updateDynamicProduct,
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
    handleCreateAppliance(data);
  };

  //  mutation function for posting Product
  async function handleCreateAppliance(data: any) {
    const actualData = {
      ...data,
      price: parseInt(data.price),
      id: ProductDetails?.product.id,
      user_id: ProductDetails?.product.user_id,
      image_urls: files,
      old_image: oldImagesId,
      category_id: catId,
    };
    // console.log("ActualData: ", actualData);
    updateAppliance(actualData);
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

            <InputBox<TDynamicForm>
              name="pname"
              id="pname"
              placeholder="Enter Title..."
              register={register}
              error={(errors && errors?.pname?.message?.toString()) || ""}
              desc="Mention the key features of you item (e.g. brand, model, age,
                type)"
              label="Ad Title"
            />
            <TextareaBox<TDynamicForm>
              name="description"
              id="description"
              placeholder="Enter Description..."
              register={register}
              error={(errors && errors?.description?.message?.toString()) || ""}
              desc="Include condition, features and reason for selling"
              label="Description"
            />

            {apiFields &&
              Object.keys(apiFields).map((key) => {
                const newKey = formatCategory(key);

                return (
                  <div key={key}>
                    <Label>{newKey}</Label>
                    <Input
                      /* @ts-ignore */
                      {...register(key)}
                      //   @ts-ignore
                      defaultValue={ProductDetails[key] as string}
                      placeholder={`Enter ${newKey}`}
                      className={clsx("border-content py-6", {
                        "border-[2px] border-destructive placeholder:text-destructive":
                          /* @ts-ignore */
                          errors[key]?.message?.toString() !== undefined,
                      })}
                    />
                    {/* @ts-ignore */}
                    {errors[key] && (
                      <span className="pl-3 text-sm font-semibold text-destructive">
                        {/* @ts-ignore  */}
                        ** {errors[key]?.message?.toString()}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Price Section */}
          <PriceBox<TDynamicForm>
            name="price"
            id="price"
            register={register}
            error={(errors && errors?.price?.message?.toString()) || ""}
          />

          {/*Location selection Section */}
          <DynamicLocationBox<TDynamicForm>
            control={control as any}
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
              {Updating ? (
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

export default EditDynamic;
