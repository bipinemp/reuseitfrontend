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
import { Label } from "@/components/ui/label";

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
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={name as string}>{label}</Label>}
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => {
          return (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={clsx(
                  "w-full border-content text-[0.9rem] font-semibold text-content lg:text-lg",
                  {
                    "border-[2px] border-destructive placeholder:text-destructive":
                      error !== "",
                  },
                )}
              >
                <SelectValue
                  className="text-lg"
                  placeholder={placeholderText}
                />
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
    </div>
  );
};

export default SelectBox;
