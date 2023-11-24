"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { furnitureList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FurnitureSchema, TFurnitures } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewFurniture } from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import FurnitureLocation from "./components/locations/FurnitureLocation";
import RadioBox from "./components/RadioBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const HomeAppliances: React.FC = () => {
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
  } = useForm<TFurnitures>({
    resolver: zodResolver(FurnitureSchema),
  });

  const typeoffurniture = furnitureList.filter((val) => val.name === "type");
  const typeofcondition = furnitureList.filter(
    (val) => val.name === "condition"
  );
  const material = furnitureList.filter((val) => val.name === "material");
  const style = furnitureList.filter((val) => val.name === "style");
  const color = furnitureList.filter((val) => val.name === "color");
  const assemblyarray = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewFurniture,
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
  const onSubmit = async (data: TFurnitures) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TFurnitures) {
    const actualData = {
      ...data,
      assembly_required: data.assembly_required === "true" ? 1 : 0,
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
    <div className="max-w-[1920px] mx-auto px-2 md:px-10 xl:px-52 2xl:px-80">
      <Title array={pathname.split("/")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        {/* Details Section */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 lg:px-10 py-8">
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
        <FurnitureLocation control={control} errors={errors} />

        {/* Photo Selection Section */}
        <FileUpload files={files} setFiles={setFiles} imgError={imgError} />

        {/* Submitting Post Button */}
        <div className="px-3 lg:px-10 py-8">
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

export default HomeAppliances;
