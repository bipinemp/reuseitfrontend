import React from "react";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import clsx from "clsx";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioBoxProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  array: ArrType[];
  placeholder: string;
  error: string;
}

type ArrType = {
  name: string;
  value: string;
};

const RadioBox = <T extends FieldValues>({
  control,
  name,
  array,
  error,
  placeholder,
}: RadioBoxProps<T>) => {
  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => {
          return (
            <div className="flex items-center gap-2 lg:gap-4">
              <Label className="text-[0.9rem] lg:text-lg">{placeholder} </Label>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex"
              >
                {array.map((val, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={val.value}
                      id="r1"
                      className={clsx("", {
                        "border-[2px] border-destructive": error !== "",
                      })}
                    />
                    <Label className="text-lg text-content" htmlFor="r1">
                      {val.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
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

export default RadioBox;
