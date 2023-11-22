"use client";

import React, { useState } from "react";
import Locations from "@/json/nepal_location.json";
import LocSelectBox from "../LocSelectBox";
import { TVehicle } from "@/types/postTypes";
import { Control, FieldErrors } from "react-hook-form";

interface LocationBoxProps {
  control: Control<TVehicle>;
  errors: FieldErrors<TVehicle>;
}

const VehicleLocationBox: React.FC<LocationBoxProps> = ({
  control,
  errors,
}) => {
  const AllProvinces = Locations.provinceList.flatMap((val) => val.name);

  const [province, setProvince] = useState<string>("");

  const ProvinceDetails = Locations.provinceList.filter(
    (provinc) => provinc.name === province
  );

  const DistrictList = ProvinceDetails[0]?.districtList.map((val) => val.name);

  const [district, setDistrict] = useState("");

  const MunicipilityDetails = ProvinceDetails[0]?.districtList.find(
    (val) => val.name === district
  )?.municipalityList;

  const MunicipilityList = MunicipilityDetails?.map((item) => item.name);

  return (
    <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-10 py-8">
      <h3 className="font-semibold underline underline-offset-2">
        CONFIRM YOUR LOCATION
      </h3>

      <LocSelectBox<TVehicle>
        name="Province"
        control={control}
        array={AllProvinces}
        placeholder="Select Province"
        label="All Provinces:"
        error={errors?.Province?.message || ""}
        onChange={(val) => setProvince(val)}
      />

      {province !== "" ? (
        <>
          <LocSelectBox<TVehicle>
            name="District"
            control={control}
            array={DistrictList}
            placeholder="Select Districts"
            label="All Districts:"
            error={errors?.District?.message || ""}
            onChange={(val) => setDistrict(val)}
          />
        </>
      ) : null}

      {district !== "" ? (
        <>
          <LocSelectBox<TVehicle>
            name="Municipality"
            control={control}
            array={MunicipilityList}
            placeholder="Select Municipality"
            label="All Municipalities:"
            error={errors?.Municipality?.message || ""}
          />
        </>
      ) : null}
    </div>
  );
};

export default VehicleLocationBox;