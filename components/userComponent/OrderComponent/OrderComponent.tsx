import Image from "next/image";
import React from "react";
import img1 from "@/public/images/image 41.png";

const OrderComponent = () => {
  return (
    <div>
      <div className="mx-6 my-6 py-2 ">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center ">
            <div className="w-28 p-1 ">
              <Image src={img1} alt=""></Image>
            </div>
            <div>
              <h2 className="font-bold text-xl ">Product Name </h2>
              <p>Price : 55</p>
            </div>
          </div>
          <div>
            <p>Successfull payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
