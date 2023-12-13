"use client";
import { Button } from "@/components/ui/button";
import OrderSummuryCard from "./OrderSummuryCard";

const OrderSummury = () => {
  const orderProducts = [{}]; // context user kora hoisilo

  return (
    <div>
      {orderProducts.map((product: any) => (
        <OrderSummuryCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default OrderSummury;
