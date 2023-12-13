import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import TshirtCart from './TshirtCart';
import "swiper/css";
import "swiper/css/navigation";
import "@/app/styles/CardStyle.css"
import ShopsCard from '../ShopsByCard/ShopsCard';
import Image from 'next/image';

const MoreArrival = () => {
  const MoreData = [
    {
      id: 4,
      imageUrl: "/images/image 53.png",
      name: "Custom Mug printing",
      price: "₹345.00 – ₹845.00",
      bgColor: "#A58341",
    },
    {
      id: 5,
      imageUrl: "/images/image 54.png",
      name: "Inner Colour Handle Mug",
      price: "₹345.00 – ₹845.00",
      bgColor: "#F4DCCA",
    },
    {
      id: 6,
      imageUrl: "/images/image 57.png",
      name: "Personalized Heart Shape",
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
    <div >
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{
          delay: 2500,
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
        {MoreData.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className='border p-6 bg-card-bg rounded-xl'>
                   <div className='border p-2 w-2/3 md:w-full bg-white rounded-xl'>
                     <Image src={item?.imageUrl} alt='' width={200} height={200} className='w-full h-[250px]'></Image>
                   </div>
                   <div className='mb-1 text-xl mt-2 '>
                     <h2>{item?.name} </h2>
                   </div>
                 </div>
            {/* <TshirtCart tsData={tshirt}></TshirtCart> */}
            {/* <ShopsCard item = {item}></ShopsCard> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreArrival;
