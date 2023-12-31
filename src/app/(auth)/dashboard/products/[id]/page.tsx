"use client";

import { useViewProductDetails } from "@/apis/queries";
import Container from "@/components/Container";
import EditAntiques from "@/components/categories/editforms/EditAntiques";
import EditAppliance from "@/components/categories/editforms/EditAppliance";
import EditBicycles from "@/components/categories/editforms/EditBicycles";
import EditBooks from "@/components/categories/editforms/EditBooks";
import EditCars from "@/components/categories/editforms/EditCars";
import EditClothing from "@/components/categories/editforms/EditClothing";
import EditElectronic from "@/components/categories/editforms/EditElectronic";
import EditFurniture from "@/components/categories/editforms/EditFurniture";
import EditMotorcycles from "@/components/categories/editforms/EditMotorcycles";
import EditSports from "@/components/categories/editforms/EditSports";
import { ProductDetailsLoading } from "@/loading/ProductDetailsLoading";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const productID = params.id;
  const { data, isPending } = useViewProductDetails(parseInt(productID));
  const prodData = data?.data[0];
  const funcname = data?.data[0]?.product?.category?.function_name;

  const renderProductDetails = () => {
    switch (
      data?.data[0]?.product?.category &&
      data?.data[0]?.product.category.category_name
    ) {
      case "Electronics":
        return <EditElectronic ProductDetails={prodData} fnname={funcname} />;
      case "Home Appliances":
        return <EditAppliance ProductDetails={prodData} fnname={funcname} />;
      case "Furniture":
        return <EditFurniture ProductDetails={prodData} fnname={funcname} />;
      case "Clothing and Accessories":
        return <EditClothing ProductDetails={prodData} fnname={funcname} />;
      case "Sports and Fitness":
        return <EditSports ProductDetails={prodData} fnname={funcname} />;
      case "Books and Media":
        return <EditBooks ProductDetails={prodData} fnname={funcname} />;
      case "Antiques and Collectibles":
        return <EditAntiques ProductDetails={prodData} fnname={funcname} />;
      case "Cars":
        return <EditCars ProductDetails={prodData} fnname={funcname} />;
      case "Bicycles":
        return <EditBicycles ProductDetails={prodData} fnname={funcname} />;
      case "Motorcycles":
        return <EditMotorcycles ProductDetails={prodData} fnname={funcname} />;
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
  return <>{isPending ? <ProductDetailsLoading /> : renderProductDetails()}</>;
};

export default Page;
