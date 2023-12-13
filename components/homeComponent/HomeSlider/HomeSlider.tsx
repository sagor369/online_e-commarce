"use client";
import React, { useEffect, useRef, useState } from "react";
import img1 from "@/public/images/homeSlider.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "@/app/styles/HomeSlider.css";
import Image from "next/image";
import axios from "axios";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";

type dataType = {
  description: string;
  image: string;
  title: string;
  _id: string;
};
const HomeSlider = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setLoading(true)
    axios(`/api/banner`).then((res) => {
      if(res.data){
        setLoading(false)
      }
      setData(res.data);
    });
  }, []);

  return (
    <div className="z-0">
      {
        loading && <div className="flex justify-center"><PageLoading></PageLoading></div>
      }
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        id="padding-close"
       
      >
        {data?.map((dt: dataType) => (
          <SwiperSlide key={dt._id}>
            <div className="relative">
              <div className="left w-full  h-[450px]">
                <Image
                  src={dt?.image}
                  // src={"https://i.ibb.co/q5jGwZJ/Frame-193.png"}
                  alt="homeSlider"
                  width={1400}
                  height={450}
                  className="w-full h-full"
                  style={{ objectFit: "contain" }}
                  
                />
              </div>
              {/* {
                dt?.title && dt?.description && <div className="absolute bottom-10 right-10  text-black  md:text-left  ml-7">
                <h2 className=" md:mt-32 mt-6 md:text-left text-center md:text-5xl text-2xl">
                  Let's Create
                </h2>
                <h1 className="xl:max-w-4xl  md:max-w-2xl font-[Poppins]  not-italic font-medium  xl:text-5xl  lg:text-6xl md:text-4xl text-2xl mt-3 my-3">
                  {dt?.title}
                </h1>
                <p className="max-w-2xl font-[Inter] xl:text-3xl md:text-5 ml-1 mt-3">
                  {dt?.description}
                </p>
                <div className="">
                  <button className="rounded-lg bg-multi-primary text-white font-[Poppins] lg:text-2xl md:text-xl font-semibold  py-3 px-4 after:md:mt-12 mt-3 ">
                    SHOP NOW
                  </button>
                </div>
              </div>
              } */}
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
