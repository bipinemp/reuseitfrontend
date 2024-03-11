import React from "react";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LabelRadioProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  array: string[];
  placeholder: string;
  error: string;
}

const LabelRadio = <T extends FieldValues>({
  control,
  name,
  array,
  error,
  placeholder,
}: LabelRadioProps<T>) => {
  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col gap-2"
            >
              <Label className="text-lg">{placeholder} </Label>
              <div className="flex flex-wrap gap-4">
                {array.map((val, i) => (
                  <div key={i}>
                    <RadioGroupItem
                      value={val}
                      id={val}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={val}
                      className="flex w-fit flex-col items-center justify-between rounded border-[2px] border-content bg-popover p-3 text-[0.8rem] hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary sm:text-[0.9rem] [&:has([data-state=checked])]:border-primary"
                    >
                      <p>{val}</p>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
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

export default LabelRadio;
