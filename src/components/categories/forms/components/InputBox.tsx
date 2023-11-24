import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface InputBoxProps<T> {
  name: keyof T;
  placeholder: string;
  id: string;
  register: (name: keyof T, options?: RegisterOptions) => UseFormRegisterReturn;
  desc?: string;
  error: string;
  label?: string;
  type?: string;
}

const InputBox = <T,>({
  name,
  placeholder,
  id,
  register,
  desc,
  error,
  label,
  type,
}: InputBoxProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={name as string}>{label}</Label>}
      <Input
        {...register(name)}
        id={id}
        type={type !== "" ? type : "text"}
        name={name as string}
        placeholder={placeholder}
        className={clsx("border-content py-6", {
          "border-destructive border-[2px] placeholder:text-destructive":
            error !== "",
        })}
      />
      {label && (
        <span
          className={clsx("text-xs text-content", {
            hidden: error !== "",
          })}
        >
          {desc}
        </span>
      )}
      {error && (
        <span className="text-destructive text-sm font-semibold pl-3">
          ** {error}
        </span>
      )}
    </div>
  );
};

export default InputBox;
