"use client"
import Image from "next/image";
import React, { useState } from "react";
import img1 from "@/public/images/singleImage/4e5fd06fc12a0cc458fae484f95a1c10.png";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

type img = {
  url:string,
  _id:string
}
const ProductImage = ({images, data}:{images:any , data:any}) => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const  session = useSession()
  let imgData = ""
  const imgChange = (i:number) =>{
    console.log(i)
    setImgIndex(i)
    imgData = images[i].url
  }
  
  const handleAddToCart = () => {
    const cardData = {
      _id:data?._id,
      email:session?.data?.user?.email
    };

    axios.post("/api/cart", cardData).then((res) => {
      if (res?.data?.success) {
        Swal.fire("your product added");
      }
      console.log(res);
    });
  };
// console.log(imgData)
  return (
    <div>
    <div className="flex gap-2 h-[500px] flex-grow">
      <div className="w-1/4 gap-4 flex flex-col items-center">
        {
          images?.map((image:img, i:number) =><button onClick={() => imgChange(i)}>
          <Image
            src={image?.url}
            alt=""
            width={80}
            height={120}
            className={imgIndex == i ? `opacity-100` : "opacity-40"}
          />
        </button>)
        }
      </div>
      <div className="w-2/3 h-full">
        {
          images?.map((img:any , i:number) => <Image
          className={`${imgIndex == i ? "block": "hidden"} h-full w-full`}
            src={img.url} 
            alt="" 
            width={1000}
            height={1200}
            
            />)
        }
      </div>
    </div>
    <div className="flex items-center gap-10 mx-10">
          <button
            onClick={handleAddToCart}
            className=" flex w-full items-center justify-center gap-3 rounded-lg bg-multi-primary py-2 px-4 text-white"
          >
            <FaShoppingCart />
            <p>Add to Cart</p>
          </button>
          <button className=" flex w-full justify-center items-center gap-3 rounded-lg bg-multi-primary py-2 px-4 text-white">
            <FaShoppingCart />
            <p>Buy Now</p>
          </button>
        </div>
    </div>
  );
};

export default ProductImage;
