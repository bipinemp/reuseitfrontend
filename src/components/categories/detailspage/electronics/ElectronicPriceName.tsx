import React from "react";

interface Props {
  pname: string;
  price: number;
  created_at: string;
  Province: string;
  District: string;
  Municipality: string;
}

const ElectronicPriceName: React.FC<Props> = ({
  pname,
  price,
  created_at,
  Province,
  District,
  Municipality,
}) => {
  return (
    <div>
      <h1>{price}</h1>
      <p>{pname}</p>
      <div>
        <p>
          {Province} {District} , {Municipality}
        </p>
        <p>{created_at}</p>
      </div>
    </div>
  );
};

export default ElectronicPriceName;
