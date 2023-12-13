import Image from "next/image";
import React from "react";
import img1 from "@/public/images/image 41.png";
import { FaHeart, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";

const CardItem = () => {
  return (
    <div className="mx-6 my-6 py-2 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-6 items-center ">
          <div className="w-28 p-1 ">
            <Image src={img1} alt=""></Image>
          </div>
          <div>
            <h2 className="font-bold text-xl ">Product Name </h2>
            <p className="mb-3 text-xs mt-1">Lorem ipsum dolor, sit amet consectetur </p>
            <p className="font-bold ">Price : 55</p>
          </div>
        </div>
        <div className="flex gap-4 pr-6"> 
        <FaRegHeart className="w-10 h-10"/>
        <FaRegTrashAlt  className="w-10 h-10"/>

        </div>
      </div>
    </div>
  );
};

export default CardItem;
