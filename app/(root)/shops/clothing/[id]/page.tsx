"use client"
import React, { useEffect, useState } from "react";
// import RelatedProduct from "@/components/singleProduct/RelatedProduct";
// import ReviewProgress from "@/components/singleProduct/ReviewProgress";
import DetailsCart from "@/components/productDetails/DetailsCart";
import { useParams } from "next/navigation";
import axios from "axios";

type paramsType = {
  id:string
}

const SingleProduct = () => {
  const [data, setData] = useState<any>(null)
  const {id} = useParams<paramsType>()

  useEffect(()=>{
    axios(`/api/products/${id}`)
  .then(res => {
    setData(res.data);
  })
  },[])
 
  return (
    <div>
      <DetailsCart data = {data}></DetailsCart>
      {/* <RelatedProduct></RelatedProduct> */}
      {/* <ReviewProgress></ReviewProgress> */}
      
    </div>
  );
};

export default SingleProduct;
