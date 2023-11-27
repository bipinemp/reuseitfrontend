import ImageSlider from "@/components/ImageSlider";
import React from "react";
import PriceNameDetails from "../PriceNameDetails";
import ProductUserDetail from "../ProductUserDetail";
import MobileImgSlider from "@/components/MobileImgSlider";
import AntiquesSpecific from "./AntiquesSpecific";

interface EDetailsProps {
  ProductDetails: EAntiquesDetails;
}

const AntiquesDetails: React.FC<EDetailsProps> = ({ ProductDetails }) => {
  return (
    <div className="max-w-[1920px] mx-auto px-4  md:px-10 xl:px-10 2xl:px-80">
      <div className="flex flex-col gap-10 mb-10">
        <MobileImgSlider ImageArr={ProductDetails.product.image} />
        <div className="flex w-full flex-col gap-10 lg:flex-row mx-auto lg:justify-between lg:mx-0">
          <ImageSlider ImageArr={ProductDetails.product.image} />

          <div className="w-full xl:w-[35%] flex flex-col gap-6">
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
          <AntiquesSpecific
            certification={ProductDetails.certification}
            condition={ProductDetails.condition}
            era_period={ProductDetails.era_period}
            historical_significance={ProductDetails.historical_significance}
            material={ProductDetails.material}
            provenance_location={ProductDetails.provenance_location}
            rarity={ProductDetails.rarity}
            type_of_item={ProductDetails.type_of_item}
          />
          <div className="w-full lg:w-[600px] xl:w-[800px] border border-gray-400 flex p-4 lg:px-[2rem] flex-col gap-4 bg-zinc-100 rounded-md">
            <h1 className="font-black text-[1.5rem] xl:text-[2rem] text-gray-700 underline underline-offset-2">
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

export default AntiquesDetails;
