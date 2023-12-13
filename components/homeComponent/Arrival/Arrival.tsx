import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import TshirtCart from './TshirtCart';
import "swiper/css";
import "swiper/css/navigation";
import "@/app/styles/CardStyle.css"
import ShopsCard from '../ShopsByCard/ShopsCard';
import Image from 'next/image';
import axios from 'axios';
import { IndianRupee } from 'lucide-react';

type tshirtType = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  bgColor: string;
};

const Arrival = () => {
    const [Data, setData] = useState<tshirtType[]>([])

    useEffect(()=>{
      axios("/api/newarrival")
      .then(res => {
        setData(res.data)
      })
    },[])
    console.log(Data)
  // const res = await fetch("/api/new_arrival")
  // const tData = await res.json()
  // console.log(tData)
  
    const tshirtData = [
        {
          id: 1,
          imageUrl: "/images/image 35.png",
          name: "Unisex Round Neck T-Shirt",
          price: "₹345.00 – ₹845.00",
          bgColor: "#A58341",
        },
        {
          id: 2,
          imageUrl: "/images/image 38.png",
          name: "Polo T-Shirt",
          price: "₹345.00 – ₹845.00",
          bgColor: "#F4DCCA",
        },
        {
          id: 3,
          imageUrl: "/images/image 41.png",
          name: "Hoodies",
          price: "₹345.00 – ₹845.00",
          bgColor: "#1D213E",
        },
        {
          id: 4,
          imageUrl: "/images/image 41.png",
          name: "Hoodies",
          price: "₹345.00 – ₹845.00",
          bgColor: "#1D213E",
        },
      ];
    return (
        <div className=''>
             <Swiper
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          // className="mySwiper "
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {Data.map((item:any) => (
            <SwiperSlide  key={item.id} >
              <div className='border p-6 bg-card-bg rounded-xl'>
                   <div className='border p-2 w-2/3 md:w-full bg-white rounded-xl'>
                     <Image src={item?.image} alt='' width={200} height={200} className='w-full h-[250px]'></Image>
                   </div>
                   <div className='mb-1 text-xl mt-2 '>
                     <h2 className='mb-2'>{item?.name} </h2>
                     <p><span className='text-lg font-bold flex items-center'><IndianRupee className='w-5 h-5'/> {item.price.min} - <IndianRupee className='w-5 h-5'/> {item.price.max}</span></p>
                   </div>
                 </div>
              {/* <TshirtCart tsData={tshirt}></TshirtCart> */}
              {/* <ShopsCard item={item}></ShopsCard> */}
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
    );
};

export default Arrival;