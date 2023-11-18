"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Locations from "@/json/nepal_location.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { homeapplianceslist } from "@/lib/lists";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplianceSchema, TAppliance } from "@/types/postTypes";
import axios from "axios";

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

  const AllProvinces = Locations.provinceList.flatMap((val) => val.name);

  const [province, setProvince] = useState<string>("");

  const ProvinceDetails = Locations.provinceList.filter(
    (provinc) => provinc.name === province
  );

  const DistrictList = ProvinceDetails[0]?.districtList.map((val) => val.name);

  const [district, setDistrict] = useState("");

  const MunicipilityList = ProvinceDetails[0]?.districtList.find(
    (val) => val.name === district
  )?.municipalityList;

  const typeofappliance = homeapplianceslist.filter(
    (val) => val.name === "type"
  );

  const typeofcondition = homeapplianceslist.filter(
    (val) => val.name === "condition"
  );

  const typeofwarrenty = homeapplianceslist.filter(
    (val) => val.name === "warrenty"
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles: any) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 5,
    multiple: true,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (id: string) => {
    setFiles((files) => {
      const updatedFiles = files.filter((file) => file.name !== id);
      updatedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      return updatedFiles;
    });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append("image_urls", file));
  // };

  const onSubmit = async (data: TAppliance) => {
    try {
      const formData = new FormData();

      // Object.entries(data).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      // files.forEach((file, index) => {
      //   formData.append(`image_urls[${index}]`, file);
      // });

      // console.log(formData);
      console.log(files);

      const actualData = {
        ...data,
        image_urls: files,
        user_id: 1,
        price: parseInt(data.price),
      };

      console.log(actualData);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/homeappliances",
        actualData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Post successfull");
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(actualData);
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-52 2xl:px-80">
      <h2 className="font-semibold text-center my-3">POST YOUR AD</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
          </h3>
          <div className="flex flex-col gap-1">
            <Label htmlFor="pname">AD Title</Label>
            <Input
              {...register("pname")}
              id="pname"
              name="pname"
              placeholder="Enter Title..."
              className="border-content py-6"
            />
            <span className="text-xs text-content">
              Mention the key features of you item (e.g. brand, model, age,
              type)
            </span>
            <span>{errors.pname?.message}</span>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              name="description"
              id="description"
              placeholder="Enter Description..."
              className="border-content"
            />
            <span className="text-xs text-content">
              Include condition, features and reason for selling
            </span>
            <span>{errors.description?.message}</span>
          </div>
          <div>
            <Controller
              name="type_of_appliance"
              control={control}
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-content text-lg font-semibold text-content">
                      <SelectValue
                        className="text-lg"
                        placeholder="Select Type of Appliance"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="underline underline-offset-2 text-2xl">
                          Appliances:
                        </SelectLabel>
                        {typeofappliance[0]?.list?.map((type) => (
                          <SelectItem
                            className="text-lg cursor-pointer"
                            value={type}
                            key={type}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <span>{errors.type_of_appliance?.message}</span>
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              {...register("brand")}
              id="brand"
              placeholder="Enter Brand Name..."
              className="border-content py-6"
            />
            <span className="text-xs text-content">
              Enter the name of the Brand
            </span>
            <span>{errors.brand?.message}</span>
          </div>
          <div>
            <Input
              {...register("model")}
              id="model"
              placeholder="Enter Model Name..."
              className="border-content py-6"
            />
            <span>{errors.model?.message}</span>
          </div>
          <div>
            <Input
              {...register("capacity")}
              id="capacity"
              placeholder="Enter Capacity..."
              className="border-content py-6"
            />
            <span>{errors.capacity?.message}</span>
          </div>
          <div>
            <Textarea
              {...register("features")}
              id="features"
              placeholder="Enter Features..."
              className="border-content py-6"
            />
            <span>{errors.features?.message}</span>
          </div>
          <div>
            <Controller
              name="condition"
              control={control}
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-content text-lg font-semibold text-content">
                      <SelectValue
                        className="text-lg"
                        placeholder="Select Condition"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="underline underline-offset-2 text-2xl">
                          Conditions:
                        </SelectLabel>
                        {typeofcondition[0]?.list?.map((type) => (
                          <SelectItem
                            className="text-lg cursor-pointer"
                            value={type}
                            key={type}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <span>{errors.condition?.message}</span>
          </div>
          <div>
            <Controller
              name="warranty_information"
              control={control}
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-content text-lg font-semibold text-content">
                      <SelectValue
                        className="text-lg"
                        placeholder="Select the  Warrenty"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="underline underline-offset-2 text-2xl">
                          Available Warrenties:
                        </SelectLabel>
                        {typeofwarrenty[0]?.list?.map((type) => (
                          <SelectItem
                            className="text-lg cursor-pointer"
                            value={type}
                            key={type}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <span>{errors.warranty_information?.message}</span>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            SET A PRICE :
          </h3>
          <div className="flex items-center relative">
            <span className="flex items-center gap-2 absolute font-bold left-2 text-content">
              RS.
              <span className="w-[0.15rem] h-[40px] bg-content block"></span>
            </span>
            <Input
              {...register("price")}
              id="price"
              className="border-content py-6 pl-14"
            />
            <span>{errors.price?.message}</span>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            CONFIRM YOUR LOCATION
          </h3>
          <Controller
            name="Province"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  onValueChange={(e) => {
                    setProvince(e);
                    field.onChange(e);
                  }}
                >
                  <SelectTrigger className="w-full border-content text-lg font-semibold text-content">
                    <SelectValue
                      className="text-lg"
                      placeholder="Select Province"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="underline underline-offset-2 text-2xl">
                        All Provinces:
                      </SelectLabel>
                      {AllProvinces.map((type) => (
                        <SelectItem
                          className="text-lg cursor-pointer"
                          value={type}
                          key={type}
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
          <span>{errors.Province?.message}</span>

          {province !== "" ? (
            <>
              <Controller
                name="District"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        setDistrict(e);
                      }}
                    >
                      <SelectTrigger className="w-full border-content text-lg font-semibold text-content">
                        <SelectValue
                          className="text-lg"
                          placeholder="Select District"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="underline underline-offset-2 text-2xl">
                            All Districts:
                          </SelectLabel>
                          {DistrictList?.map((district) => (
                            <SelectItem
                              className="text-lg cursor-pointer"
                              value={district}
                              key={district}
                            >
                              {district}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              <span>{errors.District?.message}</span>
            </>
          ) : null}

          {district !== "" ? (
            <>
              <Controller
                name="Municipality"
                control={control}
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full border-content text-lg font-semibold text-content">
                        <SelectValue
                          className="text-lg"
                          placeholder="Select Municipility"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="underline underline-offset-2 text-2xl">
                            All Municipilities:
                          </SelectLabel>
                          {MunicipilityList?.map((municipility) => (
                            <SelectItem
                              className="text-lg cursor-pointer"
                              value={municipility.name}
                              key={municipility.name}
                            >
                              {municipility.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              <span>{errors.Municipality?.message}</span>
            </>
          ) : null}
        </div>

        <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            UPLOAD UPTO 5 PHOTOS
          </h3>
          <div>
            <div
              {...getRootProps({
                className:
                  "p-10 border-[2px] border-primary border-dashed rounded-lg cursor-pointer hover:bg-neutral-100 transition",
              })}
            >
              {/* <Controller
                name="image_urls"
                control={control}
                render={({ field }) => {
                  return ( */}
              <div>
                <Input
                  {...getInputProps()}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                />

                {isDragActive ? (
                  <p className="font-semibold text-destructive text-center">
                    Drop the Images here ...
                  </p>
                ) : (
                  <p className="font-semibold text-destructive text-center">
                    Drag and Drop Images here , or click to select images <br />{" "}
                    "First Selected Image will be the cover of AD"
                  </p>
                )}
              </div>
              {/* );
                }}
              /> */}
            </div>
            {/* {JSON.stringify(errors?.image_urls?.message)} */}
          </div>
          <p>{imgError && imgError}</p>
          <div className="flex gap-5 items-center">
            {files.map((file, i) => (
              <div
                key={file.id}
                className="relative w-[150px] h-[100px] rounded-lg"
              >
                <Image
                  src={file.preview}
                  alt="image preview"
                  fill
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="rounded-lg brightness-90 z-10"
                />
                {i === 0 && (
                  <span className="rounded-lg rounded-tl-none rounded-tr-none absolute text-sm font-semibold tracking-wide py-1 z-20 text-white bg-primary w-full text-center bottom-0">
                    Cover
                  </span>
                )}
                <X
                  onClick={() => removeFile(file.name)}
                  className="z-20 absolute right-1 cursor-pointer hover:opacity-90 bg-destructive-foreground font-bold transition p-[0.3rem] top-1 h-8 w-8 rounded-full brightness-150 text-destructive"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="px-10 py-8">
          <Button
            disabled={files.length === 0}
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
