"use client";

import Products from "@/components/home/Products";
import { useSearchStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const { setSearch } = useSearchStore();

  useEffect(() => {
    setSearch("");
  }, []);

  return (
    <main>
      <Products />
    </main>
  );
}
