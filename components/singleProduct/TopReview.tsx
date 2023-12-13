import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "@/app/styles/Progress.css";
// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import img1 from "@/public/images/reviewImg/img1.jpg"
import img2 from "@/public/images/reviewImg/img2.jpg"
import img3 from "@/public/images/reviewImg/img3.jpg"
import { FaArrowRight, FaRegUserCircle, FaStar } from 'react-icons/fa';
const TopReview = () => {
    const review = [img1, img2, img3, img1, img2]

    return (
        <div className='mx-10'>
            <Swiper
            spaceBetween={30}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
           
            navigation={true}
            modules={[Autoplay, Navigation]}
            breakpoints={{
                320: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
                <div >
                {
                    review.map((img, i) =>(<div className=''><SwiperSlide>
                        <Image  src={img} alt=''/>
                            </SwiperSlide></div>))
                }
                </div>
            </Swiper>

            <div>
                <h2 className='text-2xl font-bold mt-10'>Top Reviews</h2>
                <div className='grid grid-cols-3  gap-4 items-center justify-between'>
                <div className='w-32 mt-6'>
                    <div className='flex gap-2 mb-1'>
                    <FaRegUserCircle />
                    <p>Abdullah </p>
                    </div>
                    <div className="flex mb-1 gap-2 items-center text-yellow-400">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    </div>
                    <p>Looks good, material is good</p>
                </div>
                <div className='w-32 mt-6'>
                    <div className='flex gap-2 mb-1'>
                    <FaRegUserCircle />
                    <p>Abdullah </p>
                    </div>
                    <div className="flex mb-1 gap-2 items-center text-yellow-400">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    </div>
                    <p>Looks good, material is good</p>
                </div>
                <div className='w-32 mt-6'>
                    <div className='flex gap-2 mb-1'>
                    <FaRegUserCircle />
                    <p>Abdullah </p>
                    </div>
                    <div className="flex mb-1 gap-2 items-center text-yellow-400">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    </div>
                    <p>Looks good, material is good</p>
                </div>
                <div className='w-32 mt-6'>
                    <div className='flex gap-2 mb-1'>
                    <FaRegUserCircle />
                    <p>Abdullah </p>
                    </div>
                    <div className="flex mb-1 gap-2 items-center text-yellow-400">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    </div>
                    <p>Looks good, material is good</p>
                </div>

                </div>
                <div className='flex items-center justify-center gap-1 mt-6'>
                <button className='text-center '>Load more </button>
                <FaArrowRight />

                </div>
            </div>
        </div>
    );
};

export default TopReview;