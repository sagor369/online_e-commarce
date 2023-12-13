"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Script from "next/script";
// import useRazorpay from "react-razorpay";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";



import logo from "../../public/icons/logo.png";

import AddCart from "@/app/(root)/add-cart/page";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from 'sweetalert2'

interface ExtendedWindow extends Window {
  Razorpay: any; // Replace 'any' with the actual type of Razorpay if available
}

declare var window: ExtendedWindow;

const RelatedCart = ({ product }: { product: any }) => {
  const router = useRouter();
  // console.log(product)
  const [addCard, setAddCard] = useState(false);
  const { price, images, description, category, name, subCategory, _id } =
    product;
  const session = useSession();

  //  console.log(session);

  // handle add to cart
  console.log(session?.data?.user?.email)

  const handleAddToCart = () => {
    // const cardData = {
    //   email: session?.data?.user?.email,
    //   // productId: _id
    // }

    axios.post("/api/cart", { email: session?.data?.user?.email, productId: _id })
      .then(res => {
        if (res?.data?.success) {
          Swal.fire("your product added");
        }
        console.log(res)
      })


  };


  // handle payment

  const [orderId, setOrderId] = useState<any>(null);

  const generateOrderId = () => {
    const timestamp = new Date().getTime();
    const orderId = `ORDER-${timestamp}`;
    setOrderId(orderId);
    return orderId;
  };

  const handlePayment = (amount: any) => {
    const options: any = {
      key: "rzp_test_XT5NZr4gUPVJV4", // Replace with your actual key
      amount: parseInt(amount) * 100, // Amount in paise
      currency: "INR", // Change currency as needed
      name: "Style Print",
      description: "Choose and buy your favorite product",
      order_id: orderId,
      handler: function (response: any) {
        // Handle the success callback



        console.log("Payment Successful:", response);

      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#5D1BB3",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <div className="border flex flex-col justify-between">
      <div>
        <Link href={`/shops/${category}/${_id}`}>
          <div className=" flex justify-center h-72 w-2/3 mx-auto p-2">
            <Image src={images[0]?.url} width={500} height={600} alt="" />
          </div>
        </Link>
        <div className="pt-2 px-1">
          <h2 className="font-semibold text-base">{name}</h2>
          <p>Price: ${price}</p>
        </div>
      </div>


      <div className="py-2 flex justify-between pb-4 px-2 pt-8">
        <button
          onClick={() => handlePayment(price)}
          className="bg-multi-primary py-1 px-2 text-white rounded"
        >
          Buy Now
        </button>

        <button

          onClick={() => handleAddToCart()}

          className="border border-multi-primary py-1 px-2 text-multi-primary rounded"
        >
          Add To Cart
        </button>
        <button onClick={() => setAddCard(!addCard)}>
          {addCard ? (
            <FaHeart className="w-6 h-6 text-multi-primary" />
          ) : (
            <FaRegHeart className="w-6 h-6 text-multi-primary" />
          )}
        </button>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </div>
    </div>


  );
};

export default RelatedCart;
