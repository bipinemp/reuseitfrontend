import React from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";

const Sell = () => {
  return (
    <div>
      <Button
        size="lg"
        className="text-xl rounded-full flex items-center gap-2 font-black tracking-wide"
      >
        <FaPlus /> $ELL
      </Button>
    </div>
  );
};

export default Sell;
