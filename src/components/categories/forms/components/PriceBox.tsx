import { Input } from "@/components/ui/input";
import { TAppliance } from "@/types/postTypes";
import clsx from "clsx";
import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface PriceBoxProps<T> {
  name: keyof T;
  id: string;
  register: (name: keyof T, options?: RegisterOptions) => UseFormRegisterReturn;
  error: string;
}

const PriceBox = <T,>({ name, id, register, error }: PriceBoxProps<T>) => {
  return (
    <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-10 py-8">
      <h3 className="font-semibold underline underline-offset-2">
        SET A PRICE :
      </h3>
      <div className="flex flex-col relative">
        <div className="absolute flex gap-1 left-3 top-[0.13rem] items-center">
          <span className="font-bold left-2 text-content">NPR. &nbsp;</span>
          <span className="w-[0.15rem] h-[3rem]  bg-content block"></span>
        </div>
        <Input
          type="number"
          {...register(name)}
          id={id}
          className={clsx("border-content py-6 pl-20", {
            "border-destructive border-[2px] placeholder:text-destructive":
              error !== "",
          })}
        />
        {error && (
          <span className="text-destructive text-sm font-semibold pl-3">
            ** {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceBox;
