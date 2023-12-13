import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ShopsCard from './ShopsCard';
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    image: string;
  }

const ShopSlider = ({Data}:{Data:any}) => {

    return (
        <Swiper
        slides-per-view={4}
        modules={[Navigation]}
        navigation={{
            nextEl: '.slider-next',
            prevEl: '.slider-pre',
          }}
        spaceBetween={30}
        pagination={{
          hideOnClick: true,
        }}
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
         {Data?.map((item: Product) => (
            <SwiperSlide key={item._id}>
                {/* <ShopsCard item={item}></ShopsCard> */}
                <div className='border p-6 bg-card-bg rounded-xl'>
                   <div className='border p-2 w-2/3 md:w-full bg-white rounded-xl'>
                     <Image src={item?.image} alt='' width={200} height={200} className='w-full h-[250px]'></Image>
                   </div>
                   <div className='mb-1 text-xl mt-2 '>
                     <h2>{item?.name} </h2>
                   </div>
                 </div>
            </SwiperSlide>
          // <FavoriteCard key={index} name={item.name} price={item.price} bgcolor={item.bgcolor} imageUrl={item.imageUrl} />
        ))}
       
      </Swiper>
    );
};

export default ShopSlider;