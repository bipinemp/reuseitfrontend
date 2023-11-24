"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { antiquesCollectiblesList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AntiquesSchema, TAntiques } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewAntiques } from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import AntiquesLocationBox from "./components/locations/AntiquesLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Antiques: React.FC = () => {
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
  } = useForm<TAntiques>({
    resolver: zodResolver(AntiquesSchema),
  });

  const typeofantiques = antiquesCollectiblesList.filter(
    (val) => val.name === "type"
  );
  const eraperiods = antiquesCollectiblesList.filter(
    (val) => val.name === "era_period"
  );
  const materials = antiquesCollectiblesList.filter(
    (val) => val.name === "material"
  );
  const conditions = antiquesCollectiblesList.filter(
    (val) => val.name === "condition"
  );
  const locations = antiquesCollectiblesList.filter(
    (val) => val.name === "provenance_location"
  );

  const rarities = antiquesCollectiblesList.filter(
    (val) => val.name === "rarity"
  );

  const histories = antiquesCollectiblesList.filter(
    (val) => val.name === "historical_significance"
  );

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewAntiques,
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
  const onSubmit = async (data: TAntiques) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TAntiques) {
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
        <AntiquesLocationBox control={control} errors={errors} />

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

export default Antiques;
