"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { filterProducts } from "@/apis/apicalls";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryfilter_list } from "@/lib/lists";
import FilterProdCard from "@/components/filter/FilterProdCard";
import { ProductDetailsLoading } from "@/loading/ProductDetailsLoading";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minAPrice, setMinAPrice] = useState<string>("");
  const [maxAPrice, setMaxAPrice] = useState<string>("");

  const handleApplyFilters = () => {
    setMinAPrice(minPrice);
    setMaxAPrice(maxPrice);
  };

  const { data, isPending } = useQuery<ActualRecommendation[]>({
    queryKey: ["filter", search, category, minAPrice, maxAPrice],
    queryFn: () =>
      filterProducts({
        ...(category && { category: category }),
        ...(minAPrice && { min_price: minAPrice }),
        ...(maxAPrice && { max_price: maxAPrice }),
      }),
  });

  return (
    <Container>
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-10 sm:justify-between mt-10 mb-10">
        {/* Left Side Category Filter, Price Filter */}
        <div className="flex flex-col gap-5 items-center w-full sm:w-[450px] h-[360px] bg-zinc-100 border border-content rounded-lg p-5">
          <div className="w-full flex flex-col gap-3">
            <h3 className="text-gray-600 font-black">CATEGORIES</h3>
            <Select onValueChange={(e) => setCategory(e)}>
              <SelectTrigger className="border-content text-[0.9rem] lg:text-[1rem] font-semibold text-content">
                <SelectValue
                  className="text-lg"
                  placeholder="Select Category"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="underline underline-offset-2 text-2xl">
                    Select Category :
                  </SelectLabel>
                  {categoryfilter_list.map((val) => (
                    <SelectItem
                      className="text-[0.9rem] lg:text-lg cursor-pointer"
                      value={val.name}
                      key={val.name}
                    >
                      {val.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 border-t-[1px] border-t-content pt-5">
            <h3 className="text-gray-600 font-black">BUDGET</h3>
            <p>Choose a range below</p>
            <div className="flex items-center gap-3">
              <Input
                placeholder="min"
                type="number"
                onChange={(e) => setMinPrice(e.target.value)}
                onWheel={(e) => (e.target as HTMLElement).blur()}
                className="text-sm"
              />
              <p>to</p>
              <Input
                placeholder="max"
                type="number"
                onChange={(e) => setMaxPrice(e.target.value)}
                onWheel={(e) => (e.target as HTMLElement).blur()}
                className="text-sm"
              />
              <Button onClick={handleApplyFilters}>Apply</Button>
            </div>
          </div>
        </div>

        {/* Right side Filtered data  */}
        <div className="w-full grid grid-cols-1 vsm:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-5 mb-5">
          {isPending && (
            <div className="relative mt-20">
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
            </div>
          )}
          {data?.map((prod) => (
            <FilterProdCard product={prod} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default page;
