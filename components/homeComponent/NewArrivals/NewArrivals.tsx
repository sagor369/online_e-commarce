"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import MoreArrival from "@/components/homeComponent/Arrival/MoreArrival";
import Arrival from "@/components/homeComponent/Arrival/Arrival";
import SectionTitle from "@/components/share/SectionTitle";


const NewArrivals = () => {
  // Provided T-shirt data with bgColor property added
  const [moreData, setMoreData] = useState(false);

  // useEffect(()=>{
  //   fetch('/api/new_arrival')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // },[])

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mx-6 mb-10" >
        <SectionTitle title= {"New Arrivals"}></SectionTitle>
        <button
          onClick={() => {
            setMoreData(!moreData);
          }}
          className="text-4xl font-bold"
        >
          {moreData ? <SectionTitle title = {"Less More"}/> : <SectionTitle title = {"View More"}/>}
        </button>
      </div>
      <div className="pb-6">

      <Arrival></Arrival>
      </div>
      <div className="my-6">{moreData && <MoreArrival></MoreArrival>}</div>
    </div>
  );
};

export default NewArrivals;
