"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { booksMediaList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BooksSchema, TBooks } from "@/types/postTypes";
import InputBox from "./../forms/components/InputBox";
import TextareaBox from "./../forms/components/TextareaBox";
import SelectBox from "./../forms/components/SelectBox";
import PriceBox from "./../forms/components/PriceBox";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import DashboardContainer from "@/components/DashboardContainer";
import { PiArrowLeftBold } from "react-icons/pi";
import UpdateFileUpload from "../forms/components/UpdateFileUpload";
import toast from "react-hot-toast";
import BooksLocationBox from "../forms/components/locations/BooksLocationBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

interface EDetailsProps {
  ProductDetails: EBooksDetails;
  fnname: string;
}

export type OldImages = {
  id: number;
  image_url: string;
};

const EditBooks: React.FC<EDetailsProps> = ({ ProductDetails, fnname }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const [oldImages, setOldImages] = useState<OldImages[] | []>(
    ProductDetails?.product.image ?? [],
  );
  const [oldImagesId, setOldImagesId] = useState<number[] | []>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TBooks>({
    resolver: zodResolver(BooksSchema),
    defaultValues: {
      condition: ProductDetails.condition,
      description: ProductDetails.product.description,
      District: ProductDetails.product.District,
      Municipality: ProductDetails.product.Municipality,
      pname: ProductDetails.product.pname,
      price: ProductDetails.product.price.toString(),
      Province: ProductDetails.product.Province,
      author_artist: ProductDetails.author_artist,
      edition: ProductDetails.edition,
      format: ProductDetails.format,
      genre: ProductDetails.genre,
      isbn_upc: ProductDetails.isbn_upc,
    },
  });

  const genres = booksMediaList.filter((val) => val.name === "genre");
  const formats = booksMediaList.filter((val) => val.name === "format");
  const conditions = booksMediaList.filter((val) => val.name === "condition");
  const editions = booksMediaList.filter((val) => val.name === "edition");

  // mutation function for creating Electronics AD
  const { mutate: updateClothing, isPending } = useMutation({
    mutationFn: updateProduct,
    onSettled: (data: any) => {
      if (data.success === "Successful Update") {
        toast.success("Update Successfull");
        reset();
        router.push(`/productdetails/${ProductDetails?.product_id}`);
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
    handleCreateClothing(data);
  };

  //  mutation function for posting Product
  async function handleCreateClothing(data: any) {
    const actualData = {
      ...data,
      price: parseInt(data.price),
      id: ProductDetails?.product.id,
      user_id: ProductDetails?.product.user_id,
      image_urls: files,
      old_image: oldImagesId,
      function_name: fnname,
    };
    updateClothing(actualData);
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

            <InputBox<TBooks>
              name="pname"
              id="pname"
              placeholder="Enter Title..."
              register={register}
              error={errors?.pname?.message || ""}
              desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
              label="Ad Title"
            />

            <TextareaBox<TBooks>
              name="description"
              id="description"
              placeholder="Enter Description..."
              register={register}
              error={errors?.description?.message || ""}
              desc="Include condition, features and reason for selling"
              label="Description"
            />

            <InputBox<TBooks>
              name="author_artist"
              id="author_artist"
              placeholder="Enter Author/Artist..."
              register={register}
              error={errors?.author_artist?.message || ""}
              desc="Write the Author/Artist of the Book/Media"
              label="Author/Artistf"
            />

            <div>
              <SelectBox<TBooks>
                name="genre"
                control={control}
                array={genres[0]?.list}
                placeholder="Select Type of Genre"
                label="Genres:"
                error={errors.genre?.message || ""}
              />
            </div>

            <div>
              <SelectBox<TBooks>
                name="format"
                control={control}
                array={formats[0]?.list}
                placeholder="Select the format"
                label="formats:"
                error={errors.format?.message || ""}
              />
            </div>

            <div>
              <SelectBox<TBooks>
                name="condition"
                control={control}
                array={conditions[0]?.list}
                placeholder="Select Type of condition"
                label="conditions:"
                error={errors.condition?.message || ""}
              />
            </div>

            <div>
              <SelectBox<TBooks>
                name="edition"
                control={control}
                array={editions[0]?.list}
                placeholder="Select Type of edition"
                label="editions:"
                error={errors.edition?.message || ""}
              />
            </div>

            <InputBox<TBooks>
              name="isbn_upc"
              id="isbn_upc"
              type="number"
              placeholder="Enter ISBN/UPC..."
              register={register}
              error={errors?.author_artist?.message || ""}
              desc="Write the ISBN/UPC of the Book/Media"
              label="ISBN/UPC"
            />
          </div>

          {/* Price Section */}
          <PriceBox<TBooks>
            name="price"
            id="price"
            register={register}
            error={errors?.price?.message || ""}
          />

          {/*Location selection Section */}
          <BooksLocationBox
            control={control}
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
              {isPending ? (
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

export default EditBooks;
