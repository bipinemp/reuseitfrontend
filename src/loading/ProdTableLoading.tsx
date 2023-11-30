import React from "react";

export default function ProdTableLoading() {
  const content = (
    <>
      <div className="bg-gray-300 w-[150px] h-[30px] rounded animate-pulse"></div>
      <div className="bg-gray-300 w-[130px] h-[30px] rounded animate-pulse"></div>
      <div className="bg-gray-300 w-[90px] h-[30px] rounded animate-pulse"></div>
      <div className="bg-gray-300 w-[90px] h-[30px] rounded animate-pulse"></div>
      <div className="bg-gray-300 w-[120px] h-[30px] rounded animate-pulse"></div>
    </>
  );
  return (
    <div className="flex flex-col w-[900px] h-[98.5vh] border border-input rounded-lg shadow-md">
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between border-b-[1px] border-input py-4 px-2">
        {content}
      </div>
      <div className="flex w-full justify-between pt-4 px-2">{content}</div>
    </div>
  );
}
