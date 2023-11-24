import { category_list } from "@/lib/lists";
import React from "react";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import { ScrollArea } from "../ui/scroll-area";

const Categories: React.FC = () => {
  return (
    <Container>
      <h2 className="font-black text-[0.8rem] sm:text-[0.95rem] md:text-[1.5rem] tracking-wide text-center w-fit rounded-lg bg-primary text-white p-4 px-10 mx-auto">
        POST YOUR AD ( Choose your category )
      </h2>
      <div className="w-full flex flex-col gap-2 mt-6 mb-10 mx-auto">
        <ScrollArea className="h-[400px] w-full md:w-[500px] mx-auto border-gray-400 rounded-md border">
          {category_list?.map((category, i) => (
            <CategoryItem
              key={category.name}
              name={category.name}
              icon={category.icon}
              link={category.link}
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
