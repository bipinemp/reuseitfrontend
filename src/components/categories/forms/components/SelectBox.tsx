import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TAppliance } from "@/types/postTypes";
import clsx from "clsx";
import React from "react";
import { Controller, Control } from "react-hook-form";

interface SelectBoxProps {
  name: keyof TAppliance;
  control: Control<TAppliance>;
  onChange?: (value: string) => void;
  array: string[];
  placeholder: string;
  label: string;
  error: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  control,
  name,
  array,
  label,
  error,
  placeholder,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select
              onValueChange={(e) => {
                field.onChange(e);
              }}
            >
              <SelectTrigger
                className={clsx(
                  "w-full border-content text-lg font-semibold text-content",
                  {
                    "border-destructive border-[2px] placeholder:text-destructive":
                      error !== "",
                  }
                )}
              >
                <SelectValue className="text-lg" placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="underline underline-offset-2 text-2xl">
                    {label}
                  </SelectLabel>
                  {array.map((type) => (
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
      {error && (
        <span className="text-destructive text-sm font-semibold pl-3">
          ** {error}
        </span>
      )}
    </>
  );
};

export default SelectBox;
