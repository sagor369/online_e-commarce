import React, { useEffect, useState } from 'react';
import RelatedCart from './RelatedCart';
import axios from 'axios';

type ReP ={
    id:number,
    title:string,
    image:string,
    price:number,
    rating:number
}

const RelatedProduct = ({product}:{product:any}) => {
  const [related, setRelated] = useState<any>([])

    const menProducts = [
        {
          id: 101,
          title: "Classic Leather Jacket",
          image: "",
          price: 129.99,
          rating: 4.5
        },
        {
          id: 102,
          title: "Slim Fit Denim Jeans",
          image: "https://example.com/men_product2.jpg",
          price: 59.99,
          rating: 4.0
        },
        {
          id: 103,
          title: "Casual Plaid Shirt",
          image: "https://example.com/men_product3.jpg",
          price: 34.99,
          rating: 4.2
        },
        {
          id: 104,
          title: "Sports Performance Polo",
          image: "https://example.com/men_product4.jpg",
          price: 24.99,
          rating: 4.8
        },
        {
          id: 105,
          title: "Classic Aviator Sunglasses",
          image: "https://example.com/men_product5.jpg",
          price: 19.99,
          rating: 4.7
        },
        {
          id: 106,
          title: "Leather Bifold Wallet",
          image: "https://example.com/men_product6.jpg",
          price: 39.99,
          rating: 4.3
        },
        {
          id: 107,
          title: "Running Shoes",
          image: "https://example.com/men_product7.jpg",
          price: 79.99,
          rating: 4.6
        },
        {
          id: 108,
          title: "Business Casual Watch",
          image: "https://example.com/men_product8.jpg",
          price: 89.99,
          rating: 4.4
        }
      ];
      useEffect(()=>{
        axios("/api/products")
        .then(res => {
          const relatedProduct = res.data.filter((pr:any) => pr.category == product.category)
          setRelated(relatedProduct)
          console.log(relatedProduct)

        })
      },[])
      
    return (
        <div className='container mx-auto my-10'>
            <h1 className='text-center text-4xl font-extrabold my-10'>Related Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-3'>
                {
                    related.map((product:ReP) => (
                        <RelatedCart key={product.id}
                        product = {product}
                        ></RelatedCart>
                    ))
                }

            </div>
        </div>
    );
};

export default RelatedProduct;