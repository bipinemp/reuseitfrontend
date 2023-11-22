"use client";

import { usePathname } from "next/navigation";
import Title from "./components/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cars from "./components/vehiclestypes/Cars";
import Bikes from "./components/vehiclestypes/Bikes";
import Scooters from "./components/vehiclestypes/Scooters";
import BiCycles from "./components/vehiclestypes/Bicycles";

const Vehicle: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10 xl:px-52 2xl:px-80">
      <Title array={pathname.split("/")} />
      <Tabs defaultValue="cars" className="w-full">
        <TabsList className="w-full bg-primary">
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="bikes">Bikes</TabsTrigger>
          <TabsTrigger value="scooters">Scooters</TabsTrigger>
          <TabsTrigger value="bicycles">Bicycles</TabsTrigger>
        </TabsList>
        <TabsContent value="cars">
          <Cars />
        </TabsContent>
        <TabsContent value="bikes">
          <Bikes />
        </TabsContent>
        <TabsContent value="scooters">
          <Scooters />
        </TabsContent>
        <TabsContent value="bicycles">
          <BiCycles />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vehicle;
