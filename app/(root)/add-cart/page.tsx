"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CartItem from "@/components/CartItem/CartItem";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IndianRupee } from "lucide-react";

const AddCart = () => {
  const { toast } = useToast();
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // get all cart items
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });
console.log(cartItems)
  const handleDelete = (id: any) => {
    
  };

  const handleCheckout = () => {
    
  };

  return (
    <div className="min-h-[80vh]">
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <PageLoading />
        </div>
      ) : (
        <div className="container mx-auto lg:flex items-start gap-5 justify-between my-8">
          <div className="lg:w-3/4">
            {!cartItems || cartItems?.items?.length === 0 ? (
              "No Cart Items Found"
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Product</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Subtotal</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems?.items?.map((item: any) => (
                    <CartItem
                      key={item?._id}
                      cartItems={cartItems}
                      item={item}
                      handleDelete={handleDelete}
                      totalAmount={totalAmount}
                      setTotalAmount={setTotalAmount}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="border bg-white shadow p-5 lg:w-1/4 lg:mt-0 mt-5">
            <h3 className="font-semibold text-xl mb-3 border-b pb-2">
              Price Details
            </h3>
            <p className="flex items-center justify-between mb-2">
              Subtotal ({cartItems?.items?.length || 0} items)
              <span className="flex items-center">
                <IndianRupee className="w-4" />
                {totalAmount}
              </span>
            </p>
            <p className="flex items-center justify-between mb-3">
              Delivery Fee{" "}
              <span>
                {deliveryFee === 0 ? (
                  "Free"
                ) : (
                  <span className="flex items-center">
                    <IndianRupee className="w-4" />
                    deliveryFee
                  </span>
                )}
              </span>
            </p>
            <p className="flex items-center justify-between mb-2 border-t pt-2">
              <span className="font-medium">Total Amount</span>
              <span className="flex items-center">
                <IndianRupee className="w-4" />
                {Number(totalAmount) + Number(deliveryFee)}
              </span>
            </p>
            <Link href="/checkout">
              <Button
                onClick={handleCheckout}
                className="w-full mt-3 text-white"
              >
                Proceed To Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCart;
