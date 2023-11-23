"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { clothingAccessoryList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClothingSchema, TClothing } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewAppliance } from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import ClothingLocationBox from "./components/locations/ClothingLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Clothing: React.FC = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TClothing>({
    resolver: zodResolver(ClothingSchema),
  });

  const typeofclothing = clothingAccessoryList.filter(
    (val) => val.name === "type"
  );
  const size = clothingAccessoryList.filter((val) => val.name === "size");
  const color = clothingAccessoryList.filter((val) => val.name === "color");
  const brand = clothingAccessoryList.filter((val) => val.name === "brand");
  const material = clothingAccessoryList.filter(
    (val) => val.name === "material"
  );
  const typeofcondition = clothingAccessoryList.filter(
    (val) => val.name === "condition"
  );
  const care_instructions = clothingAccessoryList.filter(
    (val) => val.name === "care_instructions"
  );

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
  const onSubmit = async (data: TClothing) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TClothing) {
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
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-52 2xl:px-80">
      <Title array={pathname.split("/")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        {/* Details Section */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
          </h3>

          <InputBox<TClothing>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TClothing>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TClothing>
              name="type_of_clothing_accessory"
              control={control}
              array={typeofclothing[0]?.list}
              placeholder="Select Type of Clothing"
              label="Clothings:"
              error={errors.type_of_clothing_accessory?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TClothing>
              name="size"
              control={control}
              array={size[0]?.list}
              placeholder="Select the Size"
              label="Sizes:"
              error={errors.size?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TClothing>
              name="color"
              control={control}
              array={color[0]?.list}
              placeholder="Select the color"
              label="colors:"
              error={errors.color?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TClothing>
              name="brand"
              control={control}
              array={brand[0]?.list}
              placeholder="Select the Brand"
              label="brands:"
              error={errors.brand?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TClothing>
              name="material"
              control={control}
              array={material[0]?.list}
              placeholder="Select Type of material"
              label="materials:"
              error={errors.material?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TClothing>
              name="condition"
              control={control}
              array={typeofcondition[0]?.list}
              placeholder="Select Type of condition"
              label="conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TClothing>
              name="care_instructions"
              control={control}
              array={care_instructions[0]?.list}
              placeholder="Select Care Instructions"
              label="Care Instructions:"
              error={errors.care_instructions?.message || ""}
            />
          </div>
        </div>

        {/* Price Section */}
        <PriceBox<TClothing>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <ClothingLocationBox control={control} errors={errors} />

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

export default Clothing;
