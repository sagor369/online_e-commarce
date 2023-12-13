import React from "react";
import {
  FaCloudUploadAlt,
  FaShippingFast,
} from "react-icons/fa";
import { MdOutlineSecurity, MdPayment } from "react-icons/md";

const ProductBuy = ({ data }: { data: any }) => {
  return (
    <div>
      {/* <div className="flex flex-col md:flex-row justify-around mb-20 mx-6 md:mx-60 items-start md:items-center">
        
        <div className="flex items-center gap-8 my-2 md:mx-4">
          <div className="flex text-white gap-2 rounded-lg bg-multi-primary px-4 py-2">
            <button>
              <FaCloudUploadAlt className=" w-6 h-6 " />
            </button>
            <p> Upload Design </p>
          </div>
          <div>
            <select
              className="border border-multi-primary py-2 px-2 text-multi-primary font-semibold rounded-lg"
              name=""
              id=""
            >
              <option value="">specify loaction</option>
              <option value="kolkata">Kolkata</option>
              <option value="bangladesh">bangladesh</option>
              <option value="india">india</option>
            </select>
          </div>
        </div>
      </div> */}
      <div className="flex items-center justify-center gap-10 py-10 text-white bg-multi-primary">
        <div className="w-40 py-4 text-base flex flex-col justify-center items-center gap-2">
          <FaShippingFast className="w-16 h-16" />
          <p>Free delivery</p>
        </div>
        <div className="w-40 py-4 text-base flex flex-col justify-center items-center gap-2">
          <MdOutlineSecurity className="w-16 h-16" />
          <p>Secure Transactions</p>
        </div>
        <div className="w-40 py-4 text-base flex flex-col justify-center items-center gap-2">
          <MdPayment className="w-16 h-16" />
          <p>Pay on Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default ProductBuy;
