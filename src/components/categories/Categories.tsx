"use client";

import React from "react";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import { ScrollArea } from "../ui/scroll-area";
import { useCategoriesList } from "@/apis/queries";
import { Loader2 } from "lucide-react";

const Categories: React.FC = () => {
  const { data, isPending } = useCategoriesList();

  if (isPending) {
    return (
      <Container>
        <div className="flex items-center justify-center mt-20">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <h2 className="font-black text-[0.8rem] sm:text-[0.95rem] md:text-[1.5rem] tracking-wide text-center w-fit rounded-lg bg-primary text-white p-4 px-10 mx-auto">
        POST YOUR AD ( Choose your category )
      </h2>
      <div className="w-full flex flex-col gap-2 mt-6 mb-10 mx-auto">
        <ScrollArea className="h-[400px] w-full md:w-[500px] mx-auto border-gray-400 rounded-md border">
          {data?.flat().map((category, i) => (
            <CategoryItem
              key={category.id}
              name={category.category_name}
              link={category.function_name}
              i={i}
              length={data?.flat().length}
            />
          ))}
        </ScrollArea>
      </div>
    </Container>
  );
};

export default Categories;
