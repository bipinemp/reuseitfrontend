"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search: React.FC = () => {
  const router = useRouter();
  const { search, setSearch } = useSearchStore();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/filter?search=${search}`);
  };

  return (
    <form
      className="relative w-full flex items-center gap-1"
      onSubmit={handleSearchSubmit}
    >
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="w-full text-xs sm:text-sm border-gray-400 py-6 pl-3 rounded-lg"
        type="text"
        placeholder="Find Cars, Mobile Phones and more..."
      />
      <Button className="absolute right-2 bg-primary py-1 px-2 rounded-md">
        <IoSearch size={25} color="white" />
      </Button>
    </form>
  );
};

export default Search;
