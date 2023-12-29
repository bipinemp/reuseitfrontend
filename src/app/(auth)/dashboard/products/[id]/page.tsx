"use client";

import { useViewProductDetails } from "@/apis/queries";
import Container from "@/components/Container";
import DashboardContainer from "@/components/DashboardContainer";
import EditElectronic from "@/components/categories/editforms/EditElectronic";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const productID = params.id;
  const { data, isPending } = useViewProductDetails(parseInt(productID));

  const renderProductDetails = () => {
    switch (
      data?.data[0]?.product?.category &&
      data?.data[0]?.product.category.category_name
    ) {
      case "Electronics":
        return (
          <EditElectronic
            ProductDetails={data?.data[0]}
            isPending={isPending}
          />
        );
      case "Home Appliances":
        return <h1>Product home</h1>;
      case "Furniture":
        return <h1>Product</h1>;
      case "Clothing and Accessories":
        return <h1>Product</h1>;
      case "Sports and Fitness":
        return <h1>Product</h1>;
      case "Books and Media":
        return <h1>Product</h1>;
      case "Antiques and Collectibles":
        return <h1>Product</h1>;
      case "Cars":
        return <h1>Product</h1>;
      case "Bicycles":
        return <h1>Product</h1>;
      case "Motorcycles":
        return <h1>Product</h1>;
      case "Scooters":
        return <h1>Product</h1>;
      case "Toys and Games":
        return <h1>Product</h1>;
      case "Musical Instruments":
        return <h1>Product</h1>;

      default:
        return (
          <Container>
            <h1>No such product exists</h1>
          </Container>
        );
    }
  };
  return <>{renderProductDetails()}</>;
};

export default Page;
