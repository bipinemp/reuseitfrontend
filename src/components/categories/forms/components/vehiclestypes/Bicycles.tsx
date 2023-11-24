"use client";

import { useEffect, useState } from "react";
import CarSelectBox from "../CarSelectBox";
import { BicycleSchema, TBicycles } from "@/types/postTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "../InputBox";
import TextareaBox from "../TextareaBox";
import FileUpload from "../FileUpload";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewBicycles } from "@/apis/apicalls";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PriceBox from "../PriceBox";
import ScooterData from "@/json/scooter.json";
import BicyclesLocationBox from "../locations/BicyclesLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Bicycles: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");

  const brands = ScooterData.Scooters.map((scooter) => scooter.brand);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TBicycles>({
    resolver: zodResolver(BicycleSchema),
  });

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewBicycles,
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
  const onSubmit = async (data: TBicycles) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TBicycles) {
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
    <div className="mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        {/* Details Section  */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 lg:px-10 py-8">
          <h3 className="font-semibold text-[0.85rem] sm:text-[1.17rem] underline underline-offset-2">
            INCLUDE SOME DETAILS (Bicycles) :
          </h3>

          <InputBox<TBicycles>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TBicycles>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <CarSelectBox
            name="brand"
            control={control}
            array={brands}
            placeholder="Select Brand"
            label="All Brands"
            error={errors?.brand?.message || ""}
          />
        </div>

        {/* Price Section */}
        <PriceBox<TBicycles>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <BicyclesLocationBox control={control} errors={errors} />

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

export default Bicycles;
