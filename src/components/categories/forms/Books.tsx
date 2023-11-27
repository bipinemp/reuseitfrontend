"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { booksMediaList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BooksSchema, TBooks } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Title from "./components/Title";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewBooks } from "@/apis/apicalls";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import BooksLocationBox from "./components/locations/BooksLocationBox";
import { useUserProfile } from "@/apis/queries";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Books: React.FC = () => {
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
  } = useForm<TBooks>({
    resolver: zodResolver(BooksSchema),
  });

  const genres = booksMediaList.filter((val) => val.name === "genre");
  const formats = booksMediaList.filter((val) => val.name === "format");
  const conditions = booksMediaList.filter((val) => val.name === "condition");
  const editions = booksMediaList.filter((val) => val.name === "edition");

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewBooks,
    onSettled: (data: any) => {
      if (data.status === 200) {
        toast.success("Post Successfull");
        reset();
        router.push(`/productdetails/${data.product_id}`);
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
  const onSubmit = async (data: TBooks) => {
    if (files.length === 0) {
      return;
    }
    handleCreateAppliance(data);
  };

  // for mutation function
  async function handleCreateAppliance(data: TBooks) {
    const actualData = {
      ...data,
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
        <BooksLocationBox control={control} errors={errors} />

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

export default Books;
