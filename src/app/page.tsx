"use client";

import { makeOffline, makeOnline } from "@/apis/apicalls";
import Products from "@/components/home/Products";
import { useSearchStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const { setSearch } = useSearchStore();

  useEffect(() => {
    setSearch("");
  }, []);

  useEffect(() => {
    makeOnline();
    window.addEventListener("beforeunload", makeOffline);

    return () => {
      window.removeEventListener("beforeunload", makeOffline);
    };
  }, []);

  return (
    <main>
      <Products />
    </main>
  );
}
