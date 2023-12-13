"use client";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderSummuryCard = ({ product }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<any>({}); //context use kora hoisilo

  const initalInfo = {
    name: "",
    price: 0,
    promoPrice: 0,
    images: [{ url: "" }],
  };
  const [productInfo, setProductInfo] = useState<any>(initalInfo);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `/api/products/${product.productId ? product.productId : product._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductInfo(data.product);
        const price =
          data.product.promoPrice > 0
            ? data.product.promoPrice
            : data.product.price;
        orderInfo.product = [
          ...orderInfo.product,
          {
            productId: data.product._id,
            price,
            quantity: data.product.quantity,
          },
        ];
        setOrderInfo({ ...orderInfo });
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex items-center border shadow mb-3 p-3 rounded-md">
      <div>
        <Image
          src={productInfo.images[0].url}
          width={80}
          height={80}
          alt="product"
        />
      </div>
      <div className="ml-5">
        <h4 className="font-semibold">{productInfo.name}</h4>
        <p>
          Price:{" "}
          {productInfo.promoPrice > 0
            ? productInfo.promoPrice
            : productInfo.price}
        </p>
        <p>Quantity: {product.quantity}</p>
      </div>
    </div>
  );
};

export default OrderSummuryCard;
