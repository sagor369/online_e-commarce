"use client";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { FaStar } from "react-icons/fa";
import "@/app/styles/Progress.css";
import TopReview from "./TopReview";

const ReviewProgress = () => {
  return (
    <div className="pt-16 mb-60 container mx-auto">
      <hr />
      <h2 className="text-center text-4xl py-4 font-bold">Review With Image</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-6">
        <div className="bg-multi-primary rounded-xl p-4">
          <h2 className="text-2xl text-white py-3">Customer Review </h2>
          <div className="flex gap-2 items-center pb-3 text-yellow-400">
            
            <FaStar /> <FaStar /> <FaStar /> <FaStar />
            <p className="font-bold text-white">3.6 out of 5</p>
          </div>
          <div className="mt-5 mb-10">
            <div className="flex gap-2 items-center mb-4">
              <Progress className="w-1/2 bg-black h-6 notRoun" value={90} />
              <p className="text-white text-lg">90%</p>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <Progress className="w-1/2 bg-black h-6 notRoun" value={50} />
              <p className="text-white text-lg">50%</p>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <Progress className="w-1/2 bg-black h-6 notRoun" value={30} />
              <p className="text-white text-lg">30%</p>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <Progress className="w-1/2 bg-black h-6 notRoun" value={20} />
              <p className="text-white text-lg">20%</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-white mb-3 ">Review this product</p>
            <p className="font-bold text-white">
              Share your thoughts with other customers
            </p>
          </div>
          <div className="flex justify-center items-center py-8">
            <button className="py-2 px-8 rounded-lg bg-white">write a product review</button>
          </div>
        </div>
        <div className="col-span-2">
            <TopReview></TopReview>
        </div>
      </div>
    </div>
  );
};

export default ReviewProgress;
