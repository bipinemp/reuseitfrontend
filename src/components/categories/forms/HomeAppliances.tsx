"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { homeapplianceslist } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplianceSchema, TAppliance } from "@/types/postTypes";
import axios from "axios";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import LocationBox from "./components/LocationBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const HomeAppliances: React.FC = () => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TAppliance>({
    resolver: zodResolver(ApplianceSchema),
  });

  const typeofappliance = homeapplianceslist.filter(
    (val) => val.name === "type"
  );

  const typeofcondition = homeapplianceslist.filter(
    (val) => val.name === "condition"
  );

  const typeofwarrenty = homeapplianceslist.filter(
    (val) => val.name === "warrenty"
  );

  const onSubmit = async (data: TAppliance) => {
    try {
      const actualData = {
        ...data,
        image_urls: files,
        user_id: 1,
        price: parseInt(data.price),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/homeappliances",
        actualData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Post successfull");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (files.length === 0) {
      setImgError("Image is required");
    }
    if (files.length !== 0) {
      setImgError("");
    }
  }, [files]);

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-52 2xl:px-80">
      <h2 className="font-semibold text-center my-3">POST YOUR AD</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        {/* Details Section */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
          </h3>

          <InputBox
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox
              name="type_of_appliance"
              control={control}
              array={typeofappliance[0]?.list}
              placeholder="Select Type of Appliance"
              label="Appliances:"
              error={errors.type_of_appliance?.message || ""}
            />
          </div>

          <InputBox
            id="brand"
            name="brand"
            placeholder="Enter Brand Name..."
            error={errors?.brand?.message || ""}
            desc="Enter the name of the Brand"
            register={register}
            label="Brand"
          />

          <InputBox
            id="model"
            name="model"
            placeholder="Enter Model Name..."
            error={errors?.model?.message || ""}
            desc="Enter the name of the Model"
            register={register}
            label="Model"
          />

          <InputBox
            id="capacity"
            name="capacity"
            placeholder="Enter Capacity..."
            error={errors?.capacity?.message || ""}
            desc="Enter the Capacity"
            register={register}
            label="Capacity"
          />

          <TextareaBox
            id="features"
            name="features"
            placeholder="Enter Features..."
            error={errors?.features?.message || ""}
            desc="Enter all the features of the Product"
            register={register}
            label="Features"
          />

          <div>
            <SelectBox
              name="condition"
              control={control}
              array={typeofcondition[0]?.list}
              placeholder="Select Condition"
              label="Conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox
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
        <PriceBox
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <LocationBox control={control} errors={errors} />

        {/* Photo Selection Section */}
        <FileUpload files={files} setFiles={setFiles} imgError={imgError} />

        {/* Submitting Post Button */}
        <div className="px-10 py-8">
          <Button
            // disabled={files.length === 0}
            type="submit"
            size="lg"
            className="text-lg w-fit"
          >
            Post now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomeAppliances;
