"use client";

import Container from "@/components/Container";
import { useProdIds } from "@/store/store";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const pidx = searchParams.get("pidx");
  const status = searchParams.get("status");

  const amount = searchParams.get("amount");
  const purchase_order_id = searchParams.get("purchase_order_id");
  const purchase_order_type = "featured";
  const purchase_order_name = searchParams.get("purchase_order_name");
  const { prodIds: product_ids, resetProdIds } = useProdIds();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkPaymentSuccess = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_KHALTI_LOOKUP}`,
        {
          pidx: pidx,
        },
        {
          headers: {
            Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_LIVE_SECRET_KEY}`,
          },
        },
      );

      const Response: TLookUp = res.data;

      if (Response.status === "Completed") {
        setMessage("Payment Completed Successfully");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_KHALTI_SUCCESS_POST}`,
          {
            amount,
            purchase_order_id,
            purchase_order_type,
            purchase_order_name,
            product_ids,
          },
          {
            withCredentials: true,
          },
        );
        if (response) {
          resetProdIds();
        }
      } else if (Response.status === "Pending") {
        setMessage("Payment Pending...");
      } else if (Response.status === "Failed") {
        setMessage("Payment Failed");
      } else if ((Response.status = "User canceled")) {
        setMessage("Payment Canceled");
      } else {
        setMessage("Something went Wrong, Try Again Later");
      }
    };
    checkPaymentSuccess();
  }, []);

  return (
    <Container>
      <div className="mx-auto mt-20 flex w-fit justify-center rounded-lg border border-input p-5 px-10 shadow-lg">
        <h1 className="font-bold text-gray-600">{message}</h1>
      </div>
    </Container>
  );
};

export default Page;
