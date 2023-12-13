import React from "react";

const CardAmunt = () => {
  return (
    <div className="mx-10 py-6">
      <div className="flex justify-between items-center gap-4 ">
        <p>Total Items</p>
        <p className=" font-bold text-xl "> $ 1</p>
      </div>
      <div className="flex justify-between items-center mt-2 gap-4 ">
        <p>Total Vat</p>
        <p className=" font-bold text-xl "> $ 55</p>
      </div>
      <div className="flex justify-between items-center gap-4 border-t pt-2 mt-3 ">
        <p>Total Amunt</p>
        <p className=" font-bold text-xl "> $ 100</p>
      </div>
      <div className="text-white mt-20  bg-multi-primary py-1 text-center ">
        <button className="w-full ">PROCEED TO CHECKOUT </button>
      </div>
    </div>
  );
};

export default CardAmunt;
