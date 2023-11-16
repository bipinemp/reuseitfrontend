import React from "react";

const product = (
  <div className="aspect-square w-full h-[314px] shadow-md col-span-1 animate-pulse border-[1px] border-gray rounded-md px-2 pt-2 pb-2 flex flex-col gap-2">
    <div className="relative w-full h-[200px] bg-gray-300 rounded-md"></div>
    <div className="px-2 flex flex-col gap-5 mt-1">
      <div className="flex flex-col gap-2">
        <h3 className="w-[150px] h-[20px] bg-gray-300 rounded-md"></h3>
        <p className="w-[90%] h-[20px] bg-gray-300 rounded-md"></p>
      </div>
      <div className="flex justify-between items-center">
        <p className="w-[120px] h-[13px] bg-gray-300 rounded-md"></p>
        <p className="w-[70px] h-[13px] bg-gray-300 rounded-md"></p>
      </div>
    </div>
  </div>
);

export function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 mb-5">
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
    </div>
  );
}

export function ProductLoading2() {
  return (
    <>
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
      {product}
    </>
  );
}
