import Link from "next/link";
import React from "react";
import "@/app/styles/CardStyle.css";

const TshirtCart = ({ tsData }: { tsData: any }) => {
  const { image, tshirt_name, price, id } = tsData;
  const color = tsData.bgColor;

  return (
    <div className="md:mx-10">
      <Link className="" href={`http://localhost:3000/shops/clothing/${id}`}>
        <div className="card-shadow my-2 rounded-2xl ">
          <div
            className={` rounded-2xl flex justify-center items-center mx-auto md:h-[300px] `}
            style={{ backgroundColor: color }}
          >
            <img src={image} alt={tshirt_name} className="h-[280px]" />
          </div>
          <div className="pt-2 mx-2 text-center">
            <h3 className="text-2xl font-semibold mb-2">{tshirt_name}</h3>
            <p className=" font-semibold">Price: {price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TshirtCart;
