"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { furnitureList, musicalInstrumentsList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FurnitureSchema, MusicsSchema, TMusic } from "@/types/postTypes";
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
import FurnitureLocation from "./components/locations/FurnitureLocation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import RadioBox from "./components/RadioBox";
import MusicLocationBox from "./components/locations/MusicLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Musics: React.FC = () => {
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
  } = useForm<TMusic>({
    resolver: zodResolver(MusicsSchema),
  });

  const typeofinstrument = musicalInstrumentsList.filter(
    (val) => val.name === "type"
  );
  const brands = musicalInstrumentsList.filter((val) => val.name === "brand");
  const conditions = musicalInstrumentsList.filter(
    (val) => val.name === "condition"
  );
  const materials = musicalInstrumentsList.filter(
    (val) => val.name === "material"
  );
  const soundcharacteristics = musicalInstrumentsList.filter(
    (val) => val.name === "sound_characteristics"
  );
  const assemblyarray = [
    { name: "Yes", value: "true" },
    { name: "No", value: "false" },
  ];

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
  const onSubmit = async (data: TMusic) => {
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TMusic) {
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

          <InputBox<TMusic>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TMusic>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TMusic>
              name="type_of_instrument"
              control={control}
              array={typeofinstrument[0]?.list}
              placeholder="Select Type of Instrument"
              label="Instruments:"
              error={errors.type_of_instrument?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TMusic>
              name="brand"
              control={control}
              array={brands[0]?.list}
              placeholder="Select Type of Band"
              label="Brands:"
              error={errors.brand?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TMusic>
              name="condition"
              control={control}
              array={conditions[0]?.list}
              placeholder="Select Type of condition"
              label="conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TMusic>
              name="material"
              control={control}
              array={materials[0]?.list}
              placeholder="Select Type of Material"
              label="Materials:"
              error={errors.material?.message || ""}
            />
          </div>

          <RadioBox<TMusic>
            array={assemblyarray}
            control={control}
            error={errors?.accessories_included?.message || ""}
            name="accessories_included"
            placeholder="Accessories Included:"
          />

          <div>
            <SelectBox<TMusic>
              name="sound_characteristics"
              control={control}
              array={soundcharacteristics[0]?.list}
              placeholder="Select Type of Sound Characteristics"
              label="Sound Characteristicss:"
              error={errors.sound_characteristics?.message || ""}
              extra="( Optional )"
            />
          </div>
        </div>

        {/* Price Section */}
        <PriceBox<TMusic>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <MusicLocationBox control={control} errors={errors} />

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

export default Musics;
