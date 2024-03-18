"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import { useInfiniteQuery } from "@tanstack/react-query";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductLoading2, ProductLoadingCard } from "@/loading/ProductsLoading";
import { ProductDetailsLoading } from "@/loading/ProductDetailsLoading";

const Page: React.FC = () => {
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

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["filter", search, category, minAPrice, maxAPrice],
      queryFn: ({ pageParam = 1 }) =>
        filterProducts(pageParam, {
          ...(search && { search: search }),
          ...(category && { category: category }),
          ...(minAPrice && { min_price: minAPrice }),
          ...(maxAPrice && { max_price: maxAPrice }),
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  const FilteredData = data?.pages.map((products) =>
    products?.map((product: ActualRecommendation, i: number) => {
      return <FilterProdCard product={product} key={i} />;
    }),
  );

  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <Container>
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="mt-10 flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between">
            {/* Left Side Category Filter, Price Filter */}
            <div className="flex h-[360px] w-full flex-col items-center gap-5 rounded-lg border border-content bg-zinc-100 p-5 sm:w-[450px]">
              <div className="flex w-full flex-col gap-3">
                <h3 className="font-black text-gray-600">CATEGORIES</h3>
                <Select onValueChange={(e) => setCategory(e)}>
                  <SelectTrigger className="border-content text-[0.9rem] font-semibold text-content lg:text-[1rem]">
                    <SelectValue
                      className="text-lg"
                      placeholder="Select Category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="text-2xl underline underline-offset-2">
                        Select Category :
                      </SelectLabel>
                      {categoryfilter_list.map((val) => (
                        <SelectItem
                          className="cursor-pointer text-[0.9rem] lg:text-lg"
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
                <h3 className="font-black text-gray-600">BUDGET</h3>
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
            <div className="mb-5 grid w-full grid-cols-1 gap-x-2 gap-y-5 vsm:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {isPending && <ProductLoadingCard />}
              {FilteredData?.[0].length === 0 && (
                <div className="flex h-[360px] w-full items-center justify-center font-bold text-destructive sm:w-[450px]">
                  <h1>No Results Found :(</h1>
                </div>
              )}
              {FilteredData}
              {!hasNextPage ? null : isFetchingNextPage ? (
                <ProductLoading2 />
              ) : null}
            </div>
          </div>
          <div className="">
            <Button
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={() => fetchNextPage()}
              variant="default"
              size="lg"
              className="text-lg font-semibold tracking-wide"
            >
              {isFetchingNextPage
                ? "Loading..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing to Load"}
            </Button>
          </div>
        </div>
      </Container>
    </Suspense>
  );
};

export default Page;
