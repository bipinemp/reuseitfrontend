"use client";

import { useCategoryDetails } from "@/apis/queries";
import { DynamicFormSchema, TDynamicForm } from "@/types/postTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Control, FieldError, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PriceBox from "@/components/categories/forms/components/PriceBox";
import InputBox from "@/components/categories/forms/components/InputBox";
import TextareaBox from "@/components/categories/forms/components/TextareaBox";
import { z } from "zod";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import DynamicLocationBox from "@/components/categories/forms/components/locations/DynamicLocationBox";
import FileUpload from "@/components/categories/forms/components/FileUpload";

interface PageProps {
  params: {
    slug: string[];
  };
}

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const page: React.FC<PageProps> = ({ params }) => {
  const { data, isPending } = useCategoryDetails(parseInt(params.slug[1]));
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");

  // Assuming `fields` is the array you get from the API
  const apiFields = data?.fields?.reduce(
    (acc: Record<string, any>, field: any) => {
      acc[field.name] = z
        .string()
        .min(1, { message: `You must enter a ${field.name}` });
      return acc;
    },
    {},
  );

  // Combine your existing schema with the new fields
  const CombinedSchema = z.object({
    ...DynamicFormSchema.shape,
    ...apiFields,
  });

  // Use the combined schema in your form
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CombinedSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (files.length === 0) {
      setImgError("Image is required");
    }
    if (files.length > 0) {
      setImgError("");
    }
  }, [files]);

  if (isPending) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="mx-auto max-w-[1920px] px-2 md:px-10 xl:px-52 2xl:px-80">
      {/* Check if data is available before rendering the form */}
      {data && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col rounded-lg border-[1px] border-content"
        >
          <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 py-8 lg:px-10">
            <h3 className="font-semibold underline underline-offset-2">
              INCLUDE SOME DETAILS :
            </h3>

            <InputBox<TDynamicForm>
              name="pname"
              id="pname"
              placeholder="Enter Title..."
              register={register}
              error={(errors && errors?.pname?.message?.toString()) || ""}
              desc="Mention the key features of you item (e.g. brand, model, age,
                type)"
              label="Ad Title"
            />

            <TextareaBox<TDynamicForm>
              name="description"
              id="description"
              placeholder="Enter Description..."
              register={register}
              error={(errors && errors?.description?.message?.toString()) || ""}
              desc="Include condition, features and reason for selling"
              label="Description"
            />

            {apiFields &&
              Object.keys(apiFields).map((key) => {
                return (
                  <div key={key}>
                    <Label>{key}</Label>
                    <Input
                      {...register(key)}
                      placeholder={`Enter ${key}`}
                      className={clsx("border-content py-6", {
                        "border-[2px] border-destructive placeholder:text-destructive":
                          errors[key]?.message?.toString() !== undefined,
                      })}
                    />
                    {errors[key] && (
                      <span className="pl-3 text-sm font-semibold text-destructive">
                        ** {errors[key]?.message?.toString()}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Price Section */}
          <PriceBox<TDynamicForm>
            name="price"
            id="price"
            register={register}
            error={(errors && errors?.price?.message?.toString()) || ""}
          />

          {/*Location selection Section */}
          <DynamicLocationBox<TDynamicForm>
            control={control as any}
            errors={errors}
          />

          {/* Photo Selection Section */}
          <FileUpload files={files} setFiles={setFiles} imgError={imgError} />

          {/* Submitting Post Button */}
          <div className="px-3 py-8 lg:px-10">
            <Button type="submit" size="lg" className="w-fit text-lg">
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p>Posting..</p>
                </div>
              ) : (
                "Post now"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default page;
