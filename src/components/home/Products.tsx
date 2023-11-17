"use client";

import { fetchAllProducts } from "@/apis/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { Button } from "../ui/button";
import Container from "../Container";
import ProductCard from "./ProductCard";
import { ProductLoading2, ProductsLoading } from "@/loading/ProductsLoading";

const Products: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

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
          <p>Error: {error.message}</p>
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
