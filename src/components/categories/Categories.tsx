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
        <div className="mt-20 flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <h2 className="mx-auto w-fit rounded-lg bg-primary p-4 px-10 text-center text-[0.8rem] font-black tracking-wide text-white sm:text-[0.95rem] md:text-[1.5rem]">
        POST YOUR AD ( Choose your category )
      </h2>
      <div className="mx-auto mb-10 mt-6 flex w-full flex-col gap-2">
        <ScrollArea className="mx-auto h-[400px] w-full rounded-md border border-gray-400 md:w-[500px]">
          {data
            ?.flat()
            .map((category, i) => (
              <CategoryItem
                key={category.id}
                name={category.category_name}
                link={category.function_name}
                id={category.id}
                i={i}
                length={data?.flat().length}
                adminStatus={category.admin_status}
              />
            ))}
        </ScrollArea>
      </div>
    </Container>
  );
};

export default Categories;
