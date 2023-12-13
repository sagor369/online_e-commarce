// import TshirtCart from '@/components/homeComponent/Arrival/TshirtCart';
import RelatedCart from '@/components/singleProduct/RelatedCart';
import React from 'react';
import img1 from "/public/images/image 35.png"
import img2 from "/public/images/image 38.png"
import img3 from "/public/images/image 41.png"
import img4 from "/public/images/image 41.png"
import { User } from 'next-auth';

type ReP ={
    id:number,
    title:string,
    image:string,
    price:number,
    rating:number
}

const MyFaviourate = () => {
    // fetch("/api/favourite_products")
    // .then(res => res.json())
    // .then(data => console.log(data))
    // console.log(User)

    const tshirtData = [
        {
          id: 1,
          image: img1,
          title: "Unisex Round Neck Cotton T-Shirt",
          price: "₹845.00",
          bgColor: "#A58341",
        },
        {
          id: 2,
          image: img2,
          title: "Polo T-Shirt",
          price: "₹345.00",
          bgColor: "#F4DCCA",
        },
        {
          id: 3,
          image: img3,
          title: "Hoodies",
          price: " ₹845.00",
          bgColor: "#1D213E",
        },
        {
          id: 4,
          image: img4,
          title: "Hoodies",
          price: "₹345.00 ",
          bgColor: "#1D213E",
        },
      ];
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-2'>
            {
                tshirtData.map((product:any) => 
                <RelatedCart key={product.id}
                    product = {product}
                    ></RelatedCart>
                )
            }
            </div>
            
        </div>
    );
};

export default MyFaviourate;