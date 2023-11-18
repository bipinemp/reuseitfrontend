"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Locations from "@/json/nepal_location.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const HomeAppliances: React.FC = () => {
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

  const onDrop = useCallback((acceptedFiles: FileList) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // console.log(Locations.provinceList);

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-52 2xl:px-80">
      <h2 className="font-semibold text-center my-3">POST YOUR AD</h2>
      <form className="flex flex-col border-[1px] border-content rounded-lg mb-10">
        <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
          </h3>
          <div>
            <Input
              placeholder="Enter Title..."
              className="border-content py-6"
            />
          </div>
          <div>
            <Textarea
              placeholder="Enter Description..."
              className="border-content"
            />
          </div>
          <div>
            <Select>
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
          </div>
          <div>
            <Input
              placeholder="Enter Brand Name..."
              className="border-content py-6"
            />
          </div>
          <div>
            <Input
              placeholder="Enter Model Name..."
              className="border-content py-6"
            />
          </div>
          <div>
            <Input
              placeholder="Enter Capacity..."
              className="border-content py-6"
            />
          </div>
          <div>
            <Textarea
              placeholder="Enter Features..."
              className="border-content py-6"
            />
          </div>
          <div>
            <Select>
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
          </div>
          <div>
            <Select>
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
            <Input className="border-content py-6 pl-14" />
          </div>
        </div>

        <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            CONFIRM YOUR LOCATION
          </h3>
          <Select onValueChange={(e) => setProvince(e)}>
            <SelectTrigger className="w-full border-content text-lg font-semibold text-content">
              <SelectValue className="text-lg" placeholder="Select Province" />
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

          {province !== "" ? (
            <Select onValueChange={(e) => setDistrict(e)}>
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
          ) : null}

          {district !== "" ? (
            <Select>
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
                  "p-10 border-[2px] border-primary border-dashed rounded-lg cursor-pointer",
              })}
            >
              <Input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </div>
        </div>

        <div className="px-10 py-8">
          <Button size="lg" className="text-lg w-fit">
            Post now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomeAppliances;
