"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { sportsFitnessList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SportsSchema, TSports } from "@/types/postTypes";
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
import SportsLocationBox from "./components/locations/SportsLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Sports: React.FC = () => {
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
  } = useForm<TSports>({
    resolver: zodResolver(SportsSchema),
  });

  const typeofequipment = sportsFitnessList.filter(
    (val) => val.name === "type"
  );

  const brand = sportsFitnessList.filter((val) => val.name === "brand");
  const typeofcondition = sportsFitnessList.filter(
    (val) => val.name === "condition"
  );
  const suitablesports = sportsFitnessList.filter(
    (val) => val.name === "suitable_sport_activity"
  );
  const usageinstructions = sportsFitnessList.filter(
    (val) => val.name === "usage_instructions"
  );

  const typeofwarrenty = sportsFitnessList.filter(
    (val) => val.name === "warranty_information"
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
  const onSubmit = async (data: TSports) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TSports) {
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

          <InputBox<TSports>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TSports>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TSports>
              name="type_of_equipment"
              control={control}
              array={typeofequipment[0]?.list}
              placeholder="Select Type of Equipment"
              label="Equipments:"
              error={errors.type_of_equipment?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TSports>
              name="brand"
              control={control}
              array={brand[0]?.list}
              placeholder="Select the Brand"
              label="Brands:"
              error={errors.brand?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TSports>
              name="condition"
              control={control}
              array={typeofcondition[0]?.list}
              placeholder="Select Condition"
              label="Conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <InputBox<TSports>
            id="size"
            name="size_weight"
            placeholder="Enter Size/Weight..."
            error={errors?.size_weight?.message || ""}
            desc="Enter the size"
            register={register}
            label="Size"
          />

          <TextareaBox<TSports>
            id="features"
            name="features"
            placeholder="Enter Features..."
            error={errors?.features?.message || ""}
            desc="Enter all the features of the Product"
            register={register}
            label="Features"
          />

          <div>
            <SelectBox<TSports>
              name="suitable_sport_activity"
              control={control}
              array={suitablesports[0]?.list}
              placeholder="Select the Suitable Sports Activity"
              label="Suitable Activities:"
              error={errors?.suitable_sport_activity?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TSports>
              name="warranty_information"
              control={control}
              array={typeofwarrenty[0]?.list}
              placeholder="Select the Warranty"
              label="Available Warrenties:"
              error={errors?.warranty_information?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TSports>
              name="usage_instructions"
              control={control}
              array={usageinstructions[0]?.list}
              placeholder="Select the Usage Instruction"
              label="Usage Instructions:"
              error={errors?.usage_instructions?.message || ""}
            />
          </div>
        </div>

        {/* Price Section */}
        <PriceBox<TSports>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <SportsLocationBox control={control} errors={errors} />

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

export default Sports;
