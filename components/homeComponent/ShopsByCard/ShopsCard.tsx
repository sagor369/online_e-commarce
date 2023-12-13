import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
  } from "@/components/ui/card";
  import img from "@/public/images/image 35.png"
import Image from 'next/image';

interface Product {
  _id: number;
  name: string;
  images: [{
    url:string,
    _id:string
  }];
}

const ShopsCard = ({item}: {item:Product}) => {
    return (
      <div className='border p-6 bg-card-bg rounded-xl'>
        <div className='border p-2 w-2/3 md:w-full bg-white rounded-xl'>
          <Image src={item?.images[0]?.url} alt='' width={200} height={200} className='w-full h-[250px]'></Image>
        </div>
        <div className='mb-1 text-xl mt-2 '>
          <h2>{item?.name} </h2>
        </div>
      </div>
     
    );
};

export default ShopsCard;