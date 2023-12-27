import { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DynamicInputProps {
  type: string;
  label: string;
  placeholder: string;
}

const DynamicInput: FC<DynamicInputProps> = ({ label, type, placeholder }) => {
  return (
    <>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </>
  );
};

export default DynamicInput;
