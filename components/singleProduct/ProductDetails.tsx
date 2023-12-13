"use client";
import React, { useState } from "react";

const ProductDetails = ({ product }: { product: any }) => {
  const [sizeIndex, setSize] = useState(0);
  const [colors, setColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const pColor = ["#e50e0e", "#5808ed", "#989494", "#141414"];
  const size = ["S ", "M", "L", "XL", "XXL"];
  return (
    <div>
      <h1 className="text-xl font-bold my-3">{product?.name}</h1>
      {!product?.promoPrice ? (
        <h2 className=" py-1 px-2 text-xl font-bold inline-block mb-2">
          Price: ₹{product?.price}
        </h2>
      ) : (
        <div className="flex gap-4 text-xl font-bold mb-2">
          <p className=" ">
          Price:
          </p>
          <h2 className=" line-through">
             ₹{product?.price}
          </h2>
          <h2 className="">
             ₹{product?.promoPrice}
          </h2>
        </div>
      )}

      <ul className="text-base list-disc">
        <li>Brand:Puma(Orignal Merchandise)</li>
        <li>
          Material:220 GSM Knitted Polycotton fabric.60% cotton 40% polyester
        </li>
        <li>Gender: Unisex</li>
        <li>Collar: Polo Collar</li>
        <li>Sleeves:Half-sleeves</li>
        <li>Need help in designing?You can avail our Design Services</li>
        <li>
          If you want blank product with no customization,just type a dot’’.’’
          in the upload design section and proceed
        </li>
        <li>
          Note:color shade varitions are natural part of the manufacturing
          process and do not affect the quality or durabilty ofthe product
        </li>
      </ul>

      <h2 className="py-2 font-semibold text-2xl">SIZE</h2>
      <div>
        {product?.size?.map((sp: string, i: number) => (
          <button
            onClick={() => setSize(i)}
            className={`${
              sizeIndex == i ? `opacity-100` : "opacity-40"
            } py-1 px-4 border-multi-primary border text-2xl font-semibold`}
            key={i}
          >
            {sp}
          </button>
        ))}
      </div>
      <div className="py-2">
        <h2 className="py-2 font-semibold text-2xl">Color</h2>
        <div className="flex items-center">
          <div className="mr-16">
            {pColor.map((color, i) => (
              <button
                onClick={() => setColor(i)}
                className={`${colors == i && "border border-multi-primary"} `}
                key={i}
              >
                <p
                  style={{ background: color }}
                  className={` w-6 h-6 rounded-full mx-1 my-1`}
                ></p>
              </button>
            ))}
          </div>
          <div className="h-8 border flex items-center">
            <button
              disabled={quantity <= 1 && true}
              onClick={() => setQuantity(quantity - 1)}
              className="bg-slate-300 h-full text-lg px-2"
            >
              -
            </button>
            <input
              type="text"
              className="w-6 h-full text-center "
              value={quantity}
              name=""
              id=""
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-slate-300 h-full text-base px-2"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
