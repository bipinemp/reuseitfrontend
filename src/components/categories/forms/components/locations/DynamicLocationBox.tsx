"use client";

import React, { useState } from "react";
import Locations from "@/json/nepal_location.json";
import LocSelectBox from "../LocSelectBox";
import { Control, FieldErrors, FieldValues } from "react-hook-form";

// Define a generic type for the item in the location array
type LocationItem = {
  name: string;
};

interface LocationBoxProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  whileEditing?: boolean;
  Prov?: string;
  Dist?: string;
}

const DynamicLocationBox = <T extends Record<string, any>>({
  control,
  errors,
  whileEditing,
  Prov,
  Dist,
}: LocationBoxProps<T>) => {
  const AllProvinces = Locations.provinceList.flatMap(
    (val: LocationItem) => val.name,
  );

  const [province, setProvince] = useState<string>(Prov || "");

  const ProvinceDetails = Locations.provinceList.filter(
    (provinc: LocationItem) => provinc.name === province,
  );

  const DistrictList = ProvinceDetails[0]?.districtList.map(
    (val: LocationItem) => val.name,
  );

  const [district, setDistrict] = useState(Dist || "");

  const MunicipilityDetails = ProvinceDetails[0]?.districtList.find(
    (val: LocationItem) => val.name === district,
  )?.municipalityList;

  const MunicipilityList = MunicipilityDetails?.map(
    (item: LocationItem) => item.name,
  );

  return (
    <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-3 py-8 lg:px-10">
      <h3 className="text-[1.1rem] font-semibold underline underline-offset-2">
        CONFIRM YOUR LOCATION
      </h3>
      <LocSelectBox<T>
        name="Province"
        control={control}
        array={AllProvinces}
        placeholder="Select Province"
        label="All Provinces:"
        error={(errors && errors?.Province?.message?.toString()) || ""}
        onChange={(val) => setProvince(val)}
      />

      {whileEditing ? (
        <>
          <LocSelectBox<T>
            name="District"
            control={control}
            array={DistrictList}
            placeholder="Select Districts"
            label="All Districts:"
            error={(errors && errors?.District?.message?.toString()) || ""}
            onChange={(val) => setDistrict(val)}
          />
        </>
      ) : province !== "" ? (
        <>
          <LocSelectBox<T>
            name="District"
            control={control}
            array={DistrictList}
            placeholder="Select Districts"
            label="All Districts:"
            error={(errors && errors?.District?.message?.toString()) || ""}
            onChange={(val) => setDistrict(val)}
          />
        </>
      ) : null}

      {whileEditing ? (
        <>
          <LocSelectBox<T>
            name="Municipality"
            control={control}
            array={MunicipilityList}
            placeholder="Select Municipality"
            label="All Municipalities:"
            error={(errors && errors?.Municipality?.message?.toString()) || ""}
          />
        </>
      ) : district !== "" ? (
        <>
          <LocSelectBox<T>
            name="Municipality"
            control={control}
            array={MunicipilityList}
            placeholder="Select Municipality"
            label="All Municipalities:"
            error={(errors && errors?.Municipality?.message?.toString()) || ""}
          />
        </>
      ) : null}
    </div>
  );
};

export default DynamicLocationBox;
