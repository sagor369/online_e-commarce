import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "@/app/styles/CardStyle.css";

interface Product {
  _id: string;
  name: string;
  images: [{ url: string; _id: string }];
}

const TrindingSlider = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items = data.filter((item: any) => item.isTrending == true);
        setData(items);
      });
  }, []);

  return (
    <Swiper
      className="h-[750px] mt-6"
      slidesPerView={3}
      grid={{
        rows: 2,
      }}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Grid, Pagination]}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {data.map((item: Product) => (
        <SwiperSlide className="swiper-slide-trinding">
          <div className="border p-6 bg-card-bg rounded-xl">
            <div className="border p-2 bg-white rounded-xl">
              <Image
                src={item?.images[0]?.url}
                alt=""
                width={600}
                height={600}
                className="h-[240px]"
              ></Image>
            </div>
            <div className="mb-1 text-xl mt-2 ">
              <h2>{item?.name} </h2>
            </div>
          </div>
          {/* <div className="py-6 mx-4 rounded-xl" style={{ backgroundColor: `${item.bgcolor}` }}>
              <Image
                src={item.imageUrl}
                alt="product"
                width={600}
                height={600}
                className="h-[240px] "
              />
            </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
    // <div>
    //   <marquee behavior="" direction="right">
    //     <div className="flex gap-6">
    //       {Data.map((item: Product) => (
    //         <div className="p-3 w-1/4 h-[400px]" style={{ backgroundColor: `${item.bgcolor}` }}>
    //           <Image
    //             src={item.imageUrl}
    //             alt="product"
    //             width={600}
    //             height={600}
    //             className="h-[400px]"
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </marquee>
    // </div>
  );
};

export default TrindingSlider;
