import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TAppliance } from "@/types/postTypes";
import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface InputBoxProps {
  name: keyof TAppliance;
  placeholder: string;
  id: string;
  register: (
    name: keyof TAppliance,
    options?: RegisterOptions
  ) => UseFormRegisterReturn;
  desc: string;
  error: string;
  label?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  name,
  placeholder,
  id,
  register,
  desc,
  error,
  label,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...register(name)}
        id={id}
        name={name}
        placeholder={placeholder}
        className={clsx("border-content py-6", {
          "border-destructive border-[2px] placeholder:text-destructive":
            error !== "",
        })}
      />
      <span
        className={clsx("text-xs text-content", {
          hidden: error !== "",
        })}
      >
        {desc}
      </span>
      {error && (
        <span className="text-destructive text-sm font-semibold pl-3">
          ** {error}
        </span>
      )}
    </div>
  );
};

export default InputBox;
