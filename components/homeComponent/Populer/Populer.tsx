import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import ShopsCard from "../ShopsByCard/ShopsCard";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";

interface Product {
  name: string;
  image: string;
  _id: string;
}

const Populer = () => {
  const [Data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:3000/api/featuredcategory")
      .then((res) => res.json())
      .then((data) => {
        if(data){
          setLoading(false)
        }
        setData(data)
      }
      );
  }, []);
 
  return (
    <div className="mb-14 ">
      <div className="bg-multi-primary hidden  mt-10 text-white text-2xl py-6 md:flex justify-center gap-5">
        <p>CREATE YOUR DESIGN </p>
        <FaStar />
        <p>BEST LOCAL PRINT</p>
        <FaStar />
        <p>POPULAR PRINTING</p>
        <FaStar />
      </div>
      <div className="container mx-auto">
        <div className="my-10 font-extrabold">
          <h1 className="text-center text-2xl md:text-4xl ">
            FEATURED CATEGORIES
          </h1>
        </div>
        {
          loading && <div className="flex justify-center"><PageLoading></PageLoading></div>
        }
        <div className="grid mx-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {Data?.map((item: any) => (
            <div className="border p-6 bg-card-bg rounded-xl">
              <div className="border p-2 w-2/3 md:w-full bg-white rounded-xl">
                <Image
                  src={item?.image}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-[250px]"
                ></Image>
              </div>
              <div className="mb-1 text-xl mt-2 ">
                <h2>{item?.name} </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Populer;
