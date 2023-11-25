"use client";

import { useProductDetails } from "@/apis/queries";
import Container from "@/components/Container";
import ElectronicsDetails from "@/components/categories/detailspage/ElectronicsDetails";
import React from "react";

interface Props {
  id: string;
}

interface ProductProps {
  params: Props;
}

const page: React.FC<ProductProps> = ({ params }) => {
  const { id } = params;
  const productId = Number(id);
  const { data, isPending } = useProductDetails(productId);
  const ProductDetails = data?.data[0];

  if (isPending) {
    return (
      <Container>
        <h2>Loading Details...</h2>
      </Container>
    );
  }

  const renderProductDetails = () => {
    switch (ProductDetails.product.category.category_name) {
      case "Electronics":
        return <ElectronicsDetails ProductDetails={ProductDetails} />;
      default:
        return (
          <Container>
            <h1>No such product exists</h1>
          </Container>
        );
    }
  };

  return (
    <Container>
      <div>{renderProductDetails()}</div>
    </Container>
  );
};

export default page;
