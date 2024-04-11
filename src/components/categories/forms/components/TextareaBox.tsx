import clsx from "clsx";
import { Label } from "@/components/ui/label";
import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface InputBoxProps<T> {
  name: keyof T;
  placeholder: string;
  id: string;
  register: (name: keyof T, options?: RegisterOptions) => UseFormRegisterReturn;
  desc: string;
  error: string;
  label?: string;
}

const InputBox = <T,>({
  name,
  placeholder,
  id,
  register,
  desc,
  error,
  label,
}: InputBoxProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={name as string}>{label}</Label>}
      <Textarea
        {...register(name)}
        id={id}
        name={name as string}
        placeholder={placeholder}
        className={clsx("border-content py-6", {
          "border-[2px] border-destructive placeholder:text-destructive":
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
        <span className="pl-3 text-sm font-semibold text-destructive">
          ** {error}
        </span>
      )}
    </div>
  );
};

export default InputBox;
