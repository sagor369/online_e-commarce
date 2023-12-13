import React, { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import ShopSlider from "../ShopsByCard/ShopSlider";
import SectionTitle from "@/components/share/SectionTitle";
import TrindingSlider from "../TrindingSlider/TrindingSlider";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";

// import Data from './Data'
interface Product {
  id: number;
  name: string;
  price: number;
  bgcolor: string;
  imageUrl: string;
}
const Data: Product[] = [
  {
    id: 1,
    name: "T Shirts",
    price: 399,
    bgcolor: "#715A35",
    imageUrl: "/images/Favorite/1.png",
  },
  {
    id: 2,
    name: "Hoodies",
    price: 599,
    bgcolor: "#212645",
    imageUrl: "/images/Favorite/2.png",
  },
  {
    id: 3,
    name: "Polos",
    price: 499,
    bgcolor: "#715A35",
    imageUrl: "/images/Favorite/3.png",
  },
  {
    id: 4,
    name: "Mugs",
    price: 199,
    bgcolor: "#C46921",
    imageUrl: "/images/Favorite/4.png",
  },
  {
    id: 2,
    name: "Hoodies",
    price: 599,
    bgcolor: "#212645",
    imageUrl: "/images/Favorite/2.png",
  },
  {
    id: 5,
    name: "Bags",
    price: 599,
    bgcolor: "#C3B6A4",
    imageUrl: "/images/Favorite/5.png",
  },
  {
    id: 6,
    name: "Photo Pillows",
    price: 299,
    bgcolor: "#94645F",
    imageUrl: "/images/Favorite/6.png",
  },
  {
    id: 5,
    name: "Bags",
    price: 599,
    bgcolor: "#C3B6A4",
    imageUrl: "/images/Favorite/5.png",
  },
];
const Favorite = () => {
  const [Data , setData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    fetch("/api/category")
    .then(res=> res.json())
    .then(data => {
      if(data){
        setLoading(false)
      }
      setData(data)
    })
  },[])

  return (
    <div className="container mx-auto py-16">
      <div className="flex mb-16 flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center ">
        <SectionTitle title="Shops By Categorys"></SectionTitle>
        <div className="flex gap-6 mr-10">
          <FaArrowAltCircleLeft className="slider-pre w-6 h-6 cursor-pointer " />
          <FaArrowAltCircleRight className="slider-next w-6 h-6 cursor-pointer" />
        </div>
      </div>
      {
        loading && <div className="flex justify-center"><PageLoading></PageLoading></div>
      }
      <ShopSlider Data = {Data} ></ShopSlider>
      <div className="mt-16">
        <SectionTitle title="Trinding Products"></SectionTitle>
        <TrindingSlider></TrindingSlider>
      </div>
    </div>
  );
};

export default Favorite;
