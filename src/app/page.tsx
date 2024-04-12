"use client";

import Footer from "@/components/Footer";
import Products from "@/components/home/Products";
import { useSearchStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const { setSearch } = useSearchStore();

  useEffect(() => {
    setSearch("");
  }, [setSearch]);

  return (
    <>
      <main>
        <Products />
      </main>
      <Footer />
    </>
  );
}
