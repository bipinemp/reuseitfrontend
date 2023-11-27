"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Container from "../Container";
import ProductCard from "./ProductCard";
import { ProductLoading2, ProductsLoading } from "@/loading/ProductsLoading";
import { useFetchAllProducts, useUserProfile } from "@/apis/queries";
import { useMutation } from "@tanstack/react-query";
import { postUserIdFromHomePage } from "@/apis/apicalls";

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

  useEffect(() => {
    if (isSuccess) {
      const id = UserData?.id ? UserData?.id : null;
      const user_id = Number(id);
      postUserIdFromHomePage(user_id);
    }
  }, [isSuccess]);

  const content = data?.pages.map((products) =>
    products.map((product: Product) => {
      return <ProductCard key={product.id} product={product} />;
    })
  );

  return (
    <Container>
      <div className="flex flex-col gap-2 mb-20">
        <h2 className="font-semibold ml-2">Fresh recommendations</h2>
        {status === "pending" ? (
          <ProductsLoading />
        ) : status === "error" ? (
          <p>Error: {error?.message && error.message}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 vsm vsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 mb-5">
              {content}
              {!hasNextPage ? null : isFetchingNextPage ? (
                <ProductLoading2 />
              ) : null}
            </div>
          </>
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
