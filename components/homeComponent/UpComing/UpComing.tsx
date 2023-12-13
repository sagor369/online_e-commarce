"use client";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TshirtCart from '../Arrival/TshirtCart';
import SectionTitle from '@/components/share/SectionTitle';

const UpComing = () => {
    const ComingData = [
        {
          id: 4,
          image: "./images/image 53.png",
          tshirt_name: "Custom Mug printing",
          price: "₹345.00 – ₹845.00",
          bgColor: "#A58341",
        },
        {
          id: 5,
          image: "./images/image 54.png",
          tshirt_name: "Inner Colour Handle Mug",
          price: "₹345.00 – ₹845.00",
          bgColor: "#F4DCCA",
        },
        {
          id: 6,
          image: "./images/image 57.png",
          tshirt_name: "Personalized Heart Shape",
          price: "₹345.00 – ₹845.00",
          bgColor: "#1D213E",
        },
        {
            id: 4,
            image: "./images/image 41.png",
            tshirt_name: "Hoodies",
            price: "₹345.00 – ₹845.00",
            bgColor: "#1D213E",
          },
      ];
    return (
        <div className=' mb-6 '>
            <div className='mx-6 mb-10'>
                <SectionTitle title={"Up Coming"}/>
            </div>
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
        {ComingData.map((tshirt) => (
          <SwiperSlide key={tshirt.id}>
            <TshirtCart tsData={tshirt}></TshirtCart>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    );
};

export default UpComing;