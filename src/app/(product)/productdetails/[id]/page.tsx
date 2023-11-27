"use client";

import { useProductDetails, useUserProfile } from "@/apis/queries";
import Container from "@/components/Container";
import AntiquesDetails from "@/components/categories/detailspage/antiques/AntiquesDetails";
import BicyclesDetails from "@/components/categories/detailspage/bicycles/BicyclesDetails";
import BikesDetails from "@/components/categories/detailspage/bikes/BikesDetails";
import BooksDetails from "@/components/categories/detailspage/books/BooksDetails";
import CarsDetails from "@/components/categories/detailspage/cars/CarsDetails";
import ClothingDetails from "@/components/categories/detailspage/clothing/ClothingDetails";
import ElectronicsDetails from "@/components/categories/detailspage/electronics/ElectronicsDetails";
import FurnitureDetails from "@/components/categories/detailspage/furnitures/FurnitureDetails";
import HomeApplianceDetails from "@/components/categories/detailspage/homeappliances/HomeApplianceDetails";
import MusicsDetails from "@/components/categories/detailspage/musics/MusicsDetails";
import SportsDetails from "@/components/categories/detailspage/sports/SportsDetails";
import ToysDetails from "@/components/categories/detailspage/toys/ToysDetails";
import { ProductDetailsLoading } from "@/loading/ProductDetailsLoading";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
}

interface ProductProps {
  params: Props;
}

const page: React.FC<ProductProps> = ({ params }) => {
  const { id } = params;
  const productId = Number(id);

  const [userId, setUserId] = useState<number | null>(null);

  const { data: UserData, isPending: UserProfileLoading } = useUserProfile();
  const { data, isPending } = useProductDetails(productId, userId);

  // For getting user_id for making recommendation system

  useEffect(() => {
    if (!UserProfileLoading) {
      const id = UserData?.id ? UserData?.id : null;
      const user_id = Number(id);
      setUserId(user_id);
    }
  }, [UserProfileLoading, UserData?.id]);

  const ProductDetails = data?.data[0];
  if (isPending) {
    return <ProductDetailsLoading />;
  }

  const renderProductDetails = () => {
    switch (ProductDetails?.product.category.category_name) {
      case "Electronics":
        return <ElectronicsDetails ProductDetails={ProductDetails} />;
      case "Home Appliances":
        return <HomeApplianceDetails ProductDetails={ProductDetails} />;
      case "Furniture":
        return <FurnitureDetails ProductDetails={ProductDetails} />;
      case "Clothing and Accessories":
        return <ClothingDetails ProductDetails={ProductDetails} />;
      case "Sports and Fitness":
        return <SportsDetails ProductDetails={ProductDetails} />;
      case "Books and Media":
        return <BooksDetails ProductDetails={ProductDetails} />;
      case "Antiques and Collectibles":
        return <AntiquesDetails ProductDetails={ProductDetails} />;
      case "Cars":
        return <CarsDetails ProductDetails={ProductDetails} />;
      case "Bicycles":
        return <BicyclesDetails ProductDetails={ProductDetails} />;
      case "MotorCycles":
        return <BikesDetails ProductDetails={ProductDetails} />;
      case "Toys and Games":
        return <ToysDetails ProductDetails={ProductDetails} />;
      case "Musical Instruments":
        return <MusicsDetails ProductDetails={ProductDetails} />;

      default:
        return (
          <Container>
            <h1>No such product exists</h1>
          </Container>
        );
    }
  };

  return <div>{renderProductDetails()}</div>;
};

export default page;
