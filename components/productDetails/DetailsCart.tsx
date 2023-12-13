import React from "react";
import ProductImage from "../singleProduct/ProductImage";
import ProductDetails from "../singleProduct/ProductDetails";
import ProductBuy from "../singleProduct/ProductBuy";
type pType = {
  price: string;
  images: string[];
  description: string;
  category: string;
  name: string;
  subCategory: string;
  _id: string;
};

const DetailsCart = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="  grid grid-cols-1 mx-2 md:grid-cols-2 pt-6">
        <div className="mb-6">
          <ProductImage
            data={data}
            images={data?.product?.images}
          ></ProductImage>
        </div>
        <div>
          <ProductDetails product={data && data.product}></ProductDetails>
        </div>
      </div>
      <ProductBuy data={data}></ProductBuy>
    </div>
  );
};

export default DetailsCart;
