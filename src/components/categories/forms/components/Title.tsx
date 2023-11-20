import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TitleProps {
  array: string[];
}

const Title: React.FC<TitleProps> = ({ array }) => {
  const path = array.filter((item) => item !== "");
  return (
    <div className="flex flex-col items-center mb-5">
      <h2 className="font-semibold my-1 underline underline-offset-2">
        POST YOUR AD
      </h2>
      <div className="flex items-center">
        <Link href={`/${path[0]}`} className="text-primary font-semibold">
          {path[0]}
        </Link>
        <p className="flex gap-1 items-center">
          <ChevronRight className="w-5 h-5" />
          {path[1]}
        </p>
      </div>
    </div>
  );
};

export default Title;
