"use client";

import HomeSlider from '@/components/homeComponent/HomeSlider/HomeSlider';
import Favorite from '@/components/homeComponent/Favorite/Favorite';
import Populer from '@/components/homeComponent/Populer/Populer';
import NewArrivals from '@/components/homeComponent/NewArrivals/NewArrivals';
import PhotoGift from '@/components/homeComponent/PhotoGift/PhotoGift';
const  Home = () => {
  
  
  return (
    <main>
      <HomeSlider></HomeSlider>
      <Favorite></Favorite>
      <Populer></Populer>
      <PhotoGift></PhotoGift>
      <NewArrivals></NewArrivals>
    </main>
  );
}
export default Home
