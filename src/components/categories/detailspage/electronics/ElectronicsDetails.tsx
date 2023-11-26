import ImageSlider from "@/components/ImageSlider";
import React from "react";
import ElectronicPriceName from "./ElectronicPriceName";
import ProductUserDetail from "./ProductUserDetail";
import ElectronicsSpecific from "./ElectronicsSpecific";

interface EDetailsProps {
  ProductDetails: EProductDetails;
}

const ElectronicsDetails: React.FC<EDetailsProps> = ({ ProductDetails }) => {
  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-10 2xl:px-80">
      <div className="flex flex-col gap-10 mb-10">
        <div className="flex justify-between">
          <ImageSlider ImageArr={ProductDetails.product.image} />
          <div className="w-[35%] flex flex-col gap-6">
            <ElectronicPriceName
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
          <ElectronicsSpecific
            brand={ProductDetails.brand}
            condition={ProductDetails.condition}
            warranty_information={ProductDetails.warranty_information}
            model={ProductDetails.model}
            type_of_electronic={ProductDetails.type_of_electronic}
          />
          <div className="border border-gray-400 flex w-[63.2%] p-4 px-10 flex-col gap-4 bg-zinc-100 rounded-md">
            <h1 className="font-black text-gray-700 underline underline-offset-2">
              Description
            </h1>
            <p>{ProductDetails.product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsDetails;
