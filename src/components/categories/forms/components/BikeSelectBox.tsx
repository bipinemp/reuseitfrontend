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

interface BikeArr {
  id: number;
  name: string;
}

interface BikeSelectBoxProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  onChange?: (value: number) => void;
  array?: BikeArr[];
  placeholder: string;
  label: string;
  error: string;
}

const BikeSelectBox = <T extends FieldValues>({
  control,
  name,
  array = [],
  label,
  error,
  onChange,
  placeholder,
}: BikeSelectBoxProps<T>) => {
  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => {
          return (
            <Select
              onValueChange={(e) => {
                field.onChange(field.name);
                if (onChange) {
                  const selectedOption = array.find(
                    (option) => option.name === e
                  );
                  onChange(selectedOption?.id || 0);
                }
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
                      value={type.name}
                      key={type.id}
                    >
                      {type.name}
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

export default BikeSelectBox;
