import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface CarSelectBoxProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  onChange?: (value: string) => void;
  array?: string[];
  placeholder: string;
  label: string;
  error: string;
}

const CarSelectBox = <T extends FieldValues>({
  control,
  name,
  array = [],
  label,
  error,
  onChange,
  placeholder,
}: CarSelectBoxProps<T>) => {
  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => {
          return (
            <Select
              onValueChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger
                className={clsx(
                  "w-full border-content text-[0.9rem] font-semibold text-content lg:text-lg",
                  {
                    "border-[2px] border-destructive placeholder:text-destructive":
                      error !== "",
                  },
                )}
              >
                <SelectValue className="text-lg" placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-2xl underline underline-offset-2">
                    {label}
                  </SelectLabel>
                  {array.map((type) => (
                    <SelectItem
                      className="cursor-pointer text-[0.9rem] lg:text-lg"
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
        <span className="pl-3 text-sm font-semibold text-destructive">
          ** {error}
        </span>
      )}
    </>
  );
};

export default CarSelectBox;
