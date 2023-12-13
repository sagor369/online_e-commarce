"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Loading } from "../adminComponents/Loading/Loading";

const CartItem = ({
  item,
  handleDelete,
  cartItems,
  totalAmount,
  setTotalAmount,
}: any) => {
  const initalProduct = {
    name: "",
    price: 0,
    promoPrice: 0,
    images: [{ url: "" }],
  };
  const [product, setProduct] = useState<any>(initalProduct);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(Number(item.quantity));
  const [subTotal, setSubTotal] = useState(quantity * Number(price));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/products/${item.productId}`)
      .then((res) => res.json())
      .then((data) => {
        const promoPrice = data.product.promoPrice;
        const regularPrice = data.product.price;
        setPrice(promoPrice > 0 ? promoPrice : regularPrice);
        setProduct(data.product);
        setIsLoading(false);
      });
  }, [item]);

  useEffect(() => {
    setTotalAmount(Number(totalAmount) + Number(subTotal));
  }, []);

  useEffect(() => {
    setSubTotal(quantity * Number(price));
    setTotalAmount(Number(totalAmount) + quantity * Number(price));
  }, [price]);

  const incrementQuantity = () => {
    setSubTotal((quantity + 1) * Number(price));
    setQuantity(quantity + 1);
    setTotalAmount(Number(totalAmount) + Number(price));
  };

  const decrementQuantity = () => {
    if (quantity === 1) return;
    setSubTotal((quantity - 1) * Number(price));
    setQuantity(quantity - 1);
    setTotalAmount(Number(totalAmount) - Number(price));
  };

  useEffect(() => {
    const remainingCart = cartItems.items.filter(
      (cartItem: any) => cartItem._id !== item._id
    );
    const cart = {
      userId: cartItems.userId,
      items: [...remainingCart, { productId: item.productId, quantity }],
    };
    fetch(`/api/cart/${cartItems._id}`, {
      method: "PATCH",
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
  }, [quantity]);

  return isLoading ? (
    <Loading />
  ) : (
    <TableRow>
      <TableCell className="font-medium md:flex items-center gap-5 w-[300px]">
        <Image
          width={80}
          height={80}
          src={product?.images[0].url}
          alt="product"
        />
        <h4>{product?.name}</h4>
      </TableCell>
      <TableCell className="text-center">{price}</TableCell>
      <TableCell className="text-center">
        <div className="flex items-center justify-center">
          <Button
            onClick={decrementQuantity}
            variant="secondary"
            className="text-2xl rounded-none"
            size="icon"
          >
            -
          </Button>
          <Input
            className="outline-none w-[50px] rounded-none"
            value={quantity}
          />
          <Button
            onClick={incrementQuantity}
            variant="secondary"
            className="text-2xl rounded-none"
            size="icon"
          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-center">{subTotal}</TableCell>
      <TableCell className="text-right">
        <div>
          <X
            onClick={() => handleDelete(item._id)}
            className="cursor-pointer mx-auto"
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
