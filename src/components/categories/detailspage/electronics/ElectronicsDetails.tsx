import Container from "@/components/Container";
import ImageSlider from "@/components/ImageSlider";
import React from "react";
import ElectronicPriceName from "./ElectronicPriceName";
import ProductUserDetail from "./ProductUserDetail";

interface EDetailsProps {
  ProductDetails: EProductDetails;
}

const ElectronicsDetails: React.FC<EDetailsProps> = ({ ProductDetails }) => {
  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-10 2xl:px-80">
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
    </div>
  );
};

export default ElectronicsDetails;
