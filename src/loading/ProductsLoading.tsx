import React from "react";

export function ProductLoadingCard() {
  return (
    <>
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
      {productLoadingCard}
    </>
  );
}

export const productLoadingCard = (
  <div className="border-gray col-span-1 flex aspect-square h-[310px] w-full animate-pulse flex-col gap-2 rounded-md border-[1px] px-2 pb-2 pt-2 shadow-md">
    <div className="relative h-[200px] w-full rounded-md bg-gray-300"></div>
    <div className="mt-1 flex flex-col gap-5 px-2">
      <div className="flex flex-col gap-2">
        <h3 className="h-[20px] w-[150px] rounded-md bg-gray-300"></h3>
        <p className="h-[20px] w-[90%] rounded-md bg-gray-300"></p>
      </div>
      <div className="flex items-center justify-between">
        <p className="h-[13px] w-[120px] rounded-md bg-gray-300"></p>
        <p className="h-[13px] w-[70px] rounded-md bg-gray-300"></p>
      </div>
    </div>
  </div>
);

export function ProductsLoading() {
  const product = (
    <div className="col-span-1 flex aspect-square max-h-[14rem] w-full animate-pulse flex-col gap-2 rounded">
      <div className="relative h-[228px] w-full rounded-md bg-gray-300"></div>
      <div className="mt-1 flex flex-col gap-1 px-3 pb-2">
        <p className="h-[30px] w-[90%] rounded-md bg-gray-300"></p>
        <p className="h-[20px] w-[150px] rounded-md bg-gray-300"></p>
      </div>
    </div>
  );
  return (
    <div className="mb-5 grid grid-cols-1 gap-x-2 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  const product = (
    <div className="col-span-1 flex aspect-square max-h-[14rem] w-full animate-pulse flex-col gap-2 rounded">
      <div className="relative h-[228px] w-full rounded-md bg-gray-300"></div>
      <div className="mt-1 flex flex-col gap-1 px-3 pb-2">
        <p className="h-[30px] w-[90%] rounded-md bg-gray-300"></p>
        <p className="h-[20px] w-[150px] rounded-md bg-gray-300"></p>
      </div>
    </div>
  );
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

export function ProductLoading3() {
  const product = (
    <div className="border-gray col-span-1 flex aspect-square h-[310px] max-h-[325px] w-full animate-pulse flex-col gap-2 rounded-md border-[1px] px-2 pb-2 pt-2 shadow-md">
      <div className="relative h-[200px] w-full rounded-md bg-gray-300"></div>
      <div className="mt-1 flex flex-col gap-5 px-2">
        <div className="flex flex-col gap-2">
          <h3 className="h-[20px] w-[150px] rounded-md bg-gray-300"></h3>
          <p className="h-[20px] w-[90%] rounded-md bg-gray-300"></p>
        </div>
        <div className="flex items-center justify-between">
          <p className="h-[13px] w-[120px] rounded-md bg-gray-300"></p>
          <p className="h-[13px] w-[70px] rounded-md bg-gray-300"></p>
        </div>
      </div>
    </div>
  );
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
