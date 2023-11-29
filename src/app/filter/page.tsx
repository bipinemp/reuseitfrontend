"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { filterProducts } from "@/apis/apicalls";
import { Button } from "@/components/ui/button";

const page: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["filter", search, category],
    queryFn: () =>
      filterProducts({
        ...(category && { category: category }),
      }),
  });

  return (
    <Container>
      <div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default page;
