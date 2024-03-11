"use client";

import { useProductsPackages, useUserProfile } from "@/apis/queries";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BusinessPackages } from "@/lib/lists";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const [packages, setPackages] = useState(BusinessPackages);
  const [isPackSelected, setIsPackSelected] = useState(false);
  const [products, setProducts] = useState<TPackProds[]>([]);
  const [selectedProdLen, setSelectedProdLen] = useState(0);
  const [selectedPackLen, setSelectedPackLen] = useState(0);

  const [selectedPack, setSelectedPack] = useState<TPack>();
  const [selectedProds, setSelectedProds] = useState<
    TPackProds[] | TPackProds
  >();

  const { data, isPending } = useProductsPackages();
  const { data: UserData } = useUserProfile();

  useEffect(() => {
    setProducts(
      data?.map((prod: TPackProds) => ({ ...prod, selected: false })) || [],
    );

    const selecdPack = packages.find((pack) => pack.selected === true) as TPack;

    setSelectedPackLen(selecdPack?.id);
  }, [data, packages]);

  useEffect(() => {
    const selectedProducts = products?.filter(
      (prod: TPackProds) => prod.selected === true,
    );

    setSelectedProdLen(selectedProducts.length || 0);

    setSelectedProds(selectedProducts);
  }, [products]);

  useEffect(() => {
    const isSelected = packages.some((pack) => pack.selected === true);
    const selectedPackage = packages.find((pack) => pack.selected === true);

    setIsPackSelected(isSelected);
    setSelectedPack(selectedPackage);
  }, [packages]);

  const handlePackageClick = (id: number) => {
    const updatedPackages = packages.map((pack) => {
      if (pack.id === id) {
        return { ...pack, selected: !pack.selected };
      } else {
        return { ...pack, selected: false };
      }
    });

    setPackages(updatedPackages);
  };

  const handleProductClick = (id: number) => {
    if (selectedProdLen < selectedPackLen) {
      const updatedProductsList = products.map((prod) => {
        if (prod.id === id) {
          return { ...prod, selected: !prod.selected };
        }
        return prod;
      });

      setProducts(updatedProductsList);
    } else {
      toast.error(`Selected AD Pack only allows ${selectedPackLen} Ads`);
    }
  };

  // console.log("SelectedPack: ", selectedPack);
  // console.log("SelectedProducts: ", selectedProds);

  const handleKhaltiPayment = async () => {
    let prodList;
    if (Array.isArray(selectedProds)) {
      prodList = selectedProds?.map((prod) => prod.id);
    } else {
      prodList = [selectedProds?.id];
    }
    const payload = {
      return_url: process.env.NEXT_PUBLIC_SUCCESS_URL,
      website_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
      amount: (selectedPack?.amount || 0) * 100,
      purchase_order_id: uuidv4(),
      purchase_order_name: selectedPack?.name,
      customer_info: {
        id: UserData?.id,
        name: UserData?.name,
        email: UserData?.email,
      },
      product_details: prodList,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_KHALTI_URL}`,
        payload,
      );
      if (response && response.data.payment_url && response.status === 200) {
        window.location.href = response?.data?.payment_url;
      }
    } catch (error: any) {
      toast.error(`Error While Payment: `, error);
    }
  };

  return (
    <Container>
      <div className="relative mx-auto my-20 flex w-[517px] flex-col gap-6 rounded-lg border border-input p-5 shadow-lg">
        <h2 className="text-center font-bold text-gray-500">
          Business packages
        </h2>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center space-x-4 rounded-md border border-gray-400 p-3 pb-6">
            {packages.map((pack) => (
              <div
                onClick={() => handlePackageClick(pack.id)}
                key={pack.id}
                className={cn(
                  "flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-input p-3 shadow-md transition hover:border-primary",
                  {
                    "border-primary bg-zinc-100 transition": pack.selected,
                  },
                )}
              >
                <p className="text-[1.2rem] font-semibold text-gray-600">
                  {pack.name}
                </p>
                <span className="text-[0.9rem] font-semibold italic text-gray-600">
                  {pack.price}
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {isPending && (
          <div className="mt-10 flex items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
        )}
        {isPackSelected && (
          <>
            <h3 className="mt-5 font-semibold text-gray-500">
              Available Products
            </h3>
            <ScrollArea className="h-[400px] rounded-md border border-gray-500 p-4">
              <div className="flex flex-col gap-3">
                {products?.map((prod) => (
                  <div
                    onClick={() => handleProductClick(prod.id)}
                    className={cn(
                      "cursor-pointer rounded-md border border-input p-3 shadow transition hover:border-primary hover:bg-zinc-100",
                      {
                        "border border-primary bg-zinc-100":
                          prod.selected === true,
                      },
                    )}
                    key={prod.id}
                  >
                    <p>{prod.pname}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
        {selectedPackLen > 0 && selectedProdLen > 0 && (
          <Button onClick={handleKhaltiPayment} className="text-lg">
            Pay
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Page;
