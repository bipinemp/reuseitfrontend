import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import clsx from "clsx";

interface SelectBoxProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  array: string[];
  placeholder: string;
  label: string;
  error: string;
  extra?: string;
}

const SelectBox = <T extends FieldValues>({
  control,
  name,
  array,
  label,
  error,
  placeholder,
  extra,
}: SelectBoxProps<T>) => {
  const placeholderText = extra ? `${placeholder} ${extra}` : placeholder;
  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => {
          return (
            <Select onValueChange={field.onChange}>
              <SelectTrigger
                className={clsx(
                  "w-full border-content text-lg font-semibold text-content",
                  {
                    "border-destructive border-[2px] placeholder:text-destructive":
                      error !== "",
                  }
                )}
              >
                <SelectValue
                  className="text-lg"
                  placeholder={placeholderText}
                />
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
