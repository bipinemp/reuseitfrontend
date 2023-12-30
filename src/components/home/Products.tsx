"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Container from "../Container";
import ProductCard from "./ProductCard";
import { ProductLoading2, ProductsLoading } from "@/loading/ProductsLoading";
import { useFetchAllProducts, useUserProfile } from "@/apis/queries";
import { useMutation } from "@tanstack/react-query";
import { postUserIdFromHomePage } from "@/apis/apicalls";
import Recommendation from "./Recommendation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

const Products: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending: AllProductsLoading,
  } = useFetchAllProducts();

  // For getting user_id for making recommendation system
  const { data: UserData, isPending, isSuccess } = useUserProfile();

  // mutation function for posting user_id for recommendation and getting list of recommendation
  const {
    mutate: PostUserId,
    isPending: RecommendationLoading,
    data: Recommendations,
  } = useMutation({
    mutationFn: postUserIdFromHomePage,
  });

  useEffect(() => {
    if (isSuccess) {
      const id = UserData?.id ? UserData?.id : null;
      const user_id = Number(id);
      PostUserId(user_id);
    }
  }, [isSuccess, UserData?.id, PostUserId]);

  const prods = data?.pages.map((products) => products)[0] as any[];

  const content = data?.pages.map(
    (products) =>
      products?.map((product: Product) => {
        return <ProductCard key={product.id} product={product} />;
      }),
  );

  const UserRecommendations = Recommendations as TRecommendations;

  return (
    <Container>
      <div className="mb-20 flex flex-col gap-14">
        {UserRecommendations?.data?.recommendations?.length >= 4 && (
          <div className="flex flex-col gap-2 rounded-lg bg-primary/20 p-5">
            <>
              <h1 className="text-[1.2rem] font-black text-gray-600 underline underline-offset-4 sm:text-[2rem]">
                Recommendation For You
              </h1>

              <ScrollArea className="z-10 whitespace-nowrap">
                <div className="z-20 flex gap-5">
                  {UserRecommendations?.data?.recommendations?.map((data) => (
                    <>
                      <Recommendation recommendation={data} />
                    </>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </>
          </div>
        )}

        {status === "pending" ? (
          <ProductsLoading />
        ) : status === "error" ? (
          <p>Error: {error?.message && error.message}</p>
        ) : !prods || prods.length === 0 ? (
          <h1 className="mt-20 text-center font-bold text-destructive">
            No Products :(
          </h1>
        ) : (
          <div className="flex flex-col gap-3">
            <h1 className="text-[1.2rem] font-black text-gray-600 underline underline-offset-4 sm:text-[2rem]">
              Trending Ads
            </h1>
            <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-5 vsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {content}
              {!hasNextPage ? null : isFetchingNextPage ? (
                <ProductLoading2 />
              ) : null}
            </div>
          </div>
        )}

        {!AllProductsLoading ||
          !prods ||
          (prods.length === 0 && (
            <div className="mx-auto">
              <Button
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={() => fetchNextPage()}
                variant="default"
                size="lg"
                className="text-lg font-semibold tracking-wide"
              >
                {isFetchingNextPage ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                  </div>
                ) : hasNextPage ? (
                  "Load More"
                ) : (
                  "Nothing to Load"
                )}
              </Button>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Products;
