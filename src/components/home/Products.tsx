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

const Products: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
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
  }, [isSuccess]);

  const content = data?.pages.map((products) =>
    products?.map((product: Product) => {
      return <ProductCard key={product.id} product={product} />;
    })
  );

  const UserRecommendations = Recommendations as TRecommendations;

  return (
    <Container>
      <div className="flex flex-col gap-14 mb-20">
        {UserRecommendations?.data?.recommendations?.length > 0 && (
          <div className="flex flex-col gap-2 bg-primary/20 p-5 rounded-lg">
            <>
              <h1 className="text-[1.2rem] sm:text-[2rem] font-black text-gray-600 underline underline-offset-4">
                Recommendation For You
              </h1>

              <ScrollArea className="whitespace-nowrap z-10">
                <div className="flex gap-5 z-20">
                  {UserRecommendations &&
                    UserRecommendations?.data &&
                    UserRecommendations?.data.recommendations &&
                    UserRecommendations?.data.recommendations.map((data) => (
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
        ) : (
          <div className="flex flex-col gap-3">
            <h1 className="text-[1.2rem] sm:text-[2rem] font-black text-gray-600 underline underline-offset-4">
              Trending Ads
            </h1>
            <div className="grid grid-cols-1 vsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 mb-5">
              {content}
              {!hasNextPage ? null : isFetchingNextPage ? (
                <ProductLoading2 />
              ) : null}
            </div>
          </div>
        )}

        <div className="mx-auto">
          <Button
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
            variant="default"
            size="lg"
            className="font-semibold tracking-wide text-lg"
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
  );
};

export default Products;
