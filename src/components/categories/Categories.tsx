import { category_list } from "@/lib/lists";
import React from "react";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import { ScrollArea } from "../ui/scroll-area";

const Categories: React.FC = () => {
  return (
    <Container>
      <h2 className="font-bold text-center underline underline-offset-8 ">
        POST YOUR AD ( Choose your category )
      </h2>
      <div className="w-[600px] flex flex-col gap-2 mt-6 mb-10 mx-auto">
        <ScrollArea className="h-[400px] w-[450px] mx-auto border-gray-400 rounded-md border p-4">
          {category_list?.map((category, i) => (
            <CategoryItem
              key={category.name}
              name={category.name}
              icon={category.icon}
              i={i}
              length={category_list.length}
            />
          ))}
        </ScrollArea>
      </div>
    </Container>
  );
};

export default Categories;
