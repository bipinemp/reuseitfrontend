"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { electronicsList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElectronicsSchema, TElectronics } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import ElectronicsLocationBox from "./components/locations/ElectronicsLocationBox";
import { usePathname, useRouter } from "next/navigation";
import Title from "./components/Title";
import { createNewElectronics } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Electronics: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TElectronics>({
    resolver: zodResolver(ElectronicsSchema),
  });

  const typeofelectronic = electronicsList.filter((val) => val.name === "type");

  const typeofcondition = electronicsList.filter(
    (val) => val.name === "condition"
  );

  const typeofwarrenty = electronicsList.filter(
    (val) => val.name === "warrenty"
  );

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewElectronics,
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
  const onSubmit = async (data: TElectronics) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TElectronics) {
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
        <ElectronicsLocationBox control={control} errors={errors} />

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

export default Electronics;
