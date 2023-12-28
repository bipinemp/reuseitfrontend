import ImageSlider from "@/components/ImageSlider";
import React from "react";
import PriceNameDetails from "../PriceNameDetails";
import ProductUserDetail from "../ProductUserDetail";
import ElectronicsSpecific from "./DynamicSpecific";
import MobileImgSlider from "@/components/MobileImgSlider";
import DynamicSpecific from "./DynamicSpecific";

interface EDetailsProps {
  ProductDetails: EProductDetails;
}

const DynamicDetails: React.FC<EDetailsProps> = ({ ProductDetails }) => {
  return (
    <div className="mx-auto max-w-[1920px] px-4  md:px-10 xl:px-10 2xl:px-80">
      <div className="mb-10 flex flex-col gap-10">
        <MobileImgSlider ImageArr={ProductDetails.product.image} />
        <div className="mx-auto flex w-full flex-col gap-10 lg:mx-0 lg:flex-row lg:justify-between">
          <ImageSlider ImageArr={ProductDetails.product.image} />

          <div className="flex w-full flex-col gap-6 xl:w-[35%]">
            <PriceNameDetails
              pname={ProductDetails.product.pname}
              price={ProductDetails.product.price}
              Province={ProductDetails.product.Province}
              District={ProductDetails.product.District}
              Municipality={ProductDetails.product.Municipality}
              created_at={ProductDetails.product.created_at}
            />
            <ProductUserDetail
              user_id={ProductDetails.product.user.id}
              image_url={ProductDetails.product.user.Profile_image}
              name={ProductDetails.product.user.name}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <DynamicSpecific productDetails={ProductDetails} />
          <div className="flex w-full flex-col gap-4 rounded-md border border-gray-400 bg-zinc-100 p-4 lg:w-[600px] lg:px-[2rem] xl:w-[800px]">
            <h1 className="text-[1.5rem] font-black text-gray-700 underline underline-offset-2 xl:text-[2rem]">
              Description
            </h1>
            <p className="text-gray-600">
              {ProductDetails.product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDetails;
