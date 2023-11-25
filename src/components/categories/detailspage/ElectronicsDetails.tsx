import Container from "@/components/Container";
import ImageSlider from "@/components/ImageSlider";
import React from "react";

interface EDetailsProps {
  ProductDetails: EProductDetails;
}

const ElectronicsDetails: React.FC<EDetailsProps> = ({ ProductDetails }) => {
  return (
    <Container>
      <div className="flex justify-between items-start">
        <ImageSlider ImageArr={ProductDetails.product.image} />
        <div>
          <h1>Electronic Details</h1>
          <h3>{ProductDetails.product.pname}</h3>
          <h3>{ProductDetails.product.price}</h3>
        </div>
      </div>
    </Container>
  );
};

export default ElectronicsDetails;
