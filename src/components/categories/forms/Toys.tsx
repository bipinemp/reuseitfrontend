"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { furnitureList, toyGameList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TToys, ToysSchema } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewToys } from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import RadioBox from "./components/RadioBox";
import ToysLocationBox from "./components/locations/ToysLocationBox";
import { useUserProfile } from "@/apis/queries";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Toys: React.FC = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const { data: UserData } = useUserProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TToys>({
    resolver: zodResolver(ToysSchema),
  });

  const typeoftoy = toyGameList.filter((val) => val.name === "type");
  const brands = toyGameList.filter((val) => val.name === "brand");
  const agegroups = toyGameList.filter((val) => val.name === "age_group");
  const safetystandards = toyGameList.filter(
    (val) => val.name === "safety_information"
  );
  const typeofcondition = furnitureList.filter(
    (val) => val.name === "condition"
  );

  const assemblyarray = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewToys,
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
  const onSubmit = async (data: TToys) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TToys) {
    const actualData = {
      ...data,
      assembly_required: data.assembly_required === "true" ? 1 : 0,
      image_urls: files,
      user_id: UserData?.id,
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
        <ToysLocationBox control={control} errors={errors} />

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

export default Toys;
