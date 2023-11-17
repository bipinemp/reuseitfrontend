import React from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const Sell = () => {
  return (
    <div>
      <Link href={"/post"}>
        <Button
          size="lg"
          className="text-xl rounded-full flex items-center gap-2 font-black tracking-wide"
        >
          <FaPlus /> $ELL
        </Button>
      </Link>
    </div>
  );
};

export default Sell;
